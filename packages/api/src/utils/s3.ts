import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3'
import env from './env'

const s3Client = new S3Client({
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
  region: 'us-east-2',
})

export default s3Client
