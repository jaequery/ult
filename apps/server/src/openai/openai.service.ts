import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import PdfParse from 'pdf-parse';

@Injectable()
export class OpenaiService {
  public openai: OpenAI;
  public pinecone: Pinecone;
  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY') || '',
    });
    this.pinecone = new Pinecone({
      apiKey: this.configService.get<string>('PINECONE_API_KEY') || '',
    });
  }

  async askPdf(
    index: string,
    referenceId: number,
    pdfFileUrl: string,
    question: string,
  ) {
    const buffer = await this.downloadPdf(pdfFileUrl);
    const pdfText = await this.extractTextFromPdfBuffer(buffer);
    if (!pdfText) return;
    // generate embedding for the pdf text
    const chunks = this.chunkText(pdfText);
    for (let i = 0; i < chunks.length; i++) {
      const embedding = await this.generateEmbedding(chunks[i]);
      const vectorId = `${referenceId}-chunk-${i}`;
      await this.upsertToPinecone(index, vectorId, embedding, {
        referenceId,
        text: chunks[i],
        chunkIndex: i,
      });
    }
    const pineconeRes = await this.queryPinecone(index, question, {
      referenceId,
    });
    const relevantTexts = this.extractRelevantTexts(pineconeRes.matches);
    return this.askQuestionInChunks(relevantTexts, question);
  }

  async createChatCompletion(prompt: string) {
    console.log('sending to openai', prompt);
    const chatCompletion = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });
    console.log('openai response', chatCompletion.choices[0].message.content);
    return chatCompletion.choices[0].message.content;
  }

  async generateEmbedding(prompt: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: prompt,
    });
    return response.data[0].embedding;
  }

  async generateEmbeddingFromChunks(chunks: string[]): Promise<number[]> {
    const embeddings: number[][] = [];
    for (const chunk of chunks) {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: chunk,
      });
      embeddings.push(response.data[0].embedding);
    }

    // Combine embeddings by averaging
    const combinedEmbedding = embeddings[0].map(
      (_, i) =>
        embeddings.reduce((sum, emb) => sum + emb[i], 0) / embeddings.length,
    );

    return combinedEmbedding;
  }

  chunkText(text: string, maxLength: number = 4000): string[] {
    const chunks = [];
    let currentChunk = '';

    text.split('\n').forEach((paragraph: string) => {
      if (currentChunk.length + paragraph.length < maxLength) {
        currentChunk += paragraph + '\n';
      } else {
        chunks.push(currentChunk.trim());
        currentChunk = paragraph + '\n';
      }
    });

    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }

  // OpenAI returns single quotes for JSON, this function replaces them with double quotes
  // also replace all ```json ``` with nothing
  private formatJson(json: string): string {
    let str = json.trim();
    // Remove potential markdown code block syntax
    str = str.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    // Replace single quotes with double quotes
    str = str.replace(/'/g, '"');
    // Handle potential leading/trailing brackets or braces
    if (!str.startsWith('[') && !str.startsWith('{')) {
      str = '[' + str;
    }
    if (!str.endsWith(']') && !str.endsWith('}')) {
      str = str + ']';
    }
    return str;
  }

  async askQuestionInChunks(
    contextChunks: string[],
    question: string,
  ): Promise<any> {
    let combinedAnswers: any[] = [];
    for (const chunk of contextChunks) {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are an assistant who will answer questions based on the provided text. Respond in JSON format.',
          },
          { role: 'user', content: `Context: ${chunk}` },
          { role: 'user', content: `${question}` },
        ],
      });
      const rawAnswer = response.choices[0].message?.content;
      if (!rawAnswer) continue;
      try {
        const formattedAnswer = this.formatJson(rawAnswer);
        const answers = JSON.parse(formattedAnswer);
        if (Array.isArray(answers)) {
          combinedAnswers = [...combinedAnswers, ...answers];
        } else {
          combinedAnswers.push(answers);
        }
      } catch (e) {
        console.error('Error parsing JSON', e);
        console.log('Raw answer:', rawAnswer);
        // If parsing fails, add the raw answer as a string
        combinedAnswers.push({ rawResponse: rawAnswer });
      }
    }
    // merge multiple answers into a single array
    return combinedAnswers;
  }

  async downloadPdf(url: string): Promise<Buffer> {
    const response = await fetch(url);
    return Buffer.from(await response.arrayBuffer());
  }

  async createPineconeIndex(name: string, dimension = 1536) {
    return this.pinecone.createIndex({
      name,
      dimension, // Replace with your model dimensions
      metric: 'cosine', // Replace with your model metric
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1',
        },
      },
    });
  }

  async upsertToPinecone(
    indexName: string,
    vectorId: string,
    embedding: number[],
    metadata: Record<string, any>,
  ) {
    const index = this.pinecone.Index(indexName);
    return index.upsert([
      {
        id: vectorId,
        values: embedding,
        metadata,
      },
    ]);
  }

  async queryPinecone(
    indexName: string,
    question: string,
    filter: Record<string, any>,
    topK: number = 20, // Increased default value
  ) {
    const vector = await this.generateEmbedding(question);
    const index = this.pinecone.Index(indexName);
    const queryResponse = await index.query({
      vector,
      topK: Math.min(topK, 1000), // Limit to 1000 as a reasonable maximum
      filter,
      includeValues: true,
      includeMetadata: true,
    });
    return queryResponse;
  }

  async extractTextFromPdfBuffer(buffer: Buffer): Promise<string> {
    const pdfData = await PdfParse(buffer);
    return pdfData.text;
  }

  extractRelevantTexts(matches: any[]): string[] {
    return matches.map((match) => match.metadata.text);
  }
}
