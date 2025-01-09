import { SQSClient } from '@aws-sdk/client-sqs'
import env from './env'

const sqsClient = new SQSClient({
  credentials: {
    accessKeyId: env.SQS_ACCESS_KEY,
    secretAccessKey: env.SQS_SECRET_KEY,
  },
  endpoint: env.SQS_URL,
  region: 'us-east-2',
})

export default sqsClient
