import { S3Client, PutBucketCorsCommand } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../../.env.development') });

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-west-2',
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  } : undefined,
  endpoint: process.env.AWS_ENDPOINT, // For LocalStack
});

const corsConfiguration = {
  CORSRules: [
    {
      AllowedHeaders: ['*'],
      AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
      AllowedOrigins: [
        'http://localhost:3000',
        'http://localhost:3001', 
        'http://localhost:3002',
        'https://*', // Allow all HTTPS origins - adjust for production
      ],
      ExposeHeaders: ['ETag', 'x-amz-request-id'],
      MaxAgeSeconds: 3600,
    },
  ],
};

async function configureCors() {
  try {
    const command = new PutBucketCorsCommand({
      Bucket: process.env.AWS_S3_BUCKET || 'ult-s3',
      CORSConfiguration: corsConfiguration,
    });

    await s3Client.send(command);
    console.log('✅ CORS configuration applied successfully to S3 bucket:', process.env.AWS_S3_BUCKET);
  } catch (error) {
    console.error('❌ Error configuring CORS:', error);
    console.log('Note: You may need to configure CORS manually in your S3 bucket settings.');
  }
}

configureCors();