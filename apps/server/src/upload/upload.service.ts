import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
    
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET', 'ult-uploads');

    if (accessKeyId && secretAccessKey) {
      this.s3Client = new S3Client({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
    } else {
      // Use default AWS credentials (from IAM role, etc.)
      this.s3Client = new S3Client({ region });
    }
  }

  async getPresignedUploadUrl(
    fileName: string,
    fileType: string,
    expiresIn = 3600,
  ): Promise<{ uploadUrl: string; fileUrl: string }> {
    const key = `uploads/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, { expiresIn });
    
    // Use the correct S3 URL format based on region
    const region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    const fileUrl = `https://${this.bucketName}.s3.${region}.amazonaws.com/${key}`;

    return {
      uploadUrl,
      fileUrl,
    };
  }
}