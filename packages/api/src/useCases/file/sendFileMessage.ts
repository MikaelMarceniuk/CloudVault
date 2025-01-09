import { z } from 'zod'
import { SendMessageCommand } from '@aws-sdk/client-sqs'

import InvalidInputError from '../errors/invalidInputError'

import env from '../../utils/env'
import sqsClient from '../../utils/sqs'

const sendFileMessageUseCaseParams = z.object({
  userId: z.string(),
  parentfolder: z.array(z.string()),
  files: z.array(
    z.object({
      fieldname: z.string(),
      originalname: z.string(),
      encoding: z.string(),
      mimetype: z.string(),
      destination: z.string(),
      filename: z.string(),
      path: z.string(),
      size: z.number(),
    })
  ),
})

type sendFileMessageUseCaseParams = z.infer<typeof sendFileMessageUseCaseParams>

type SendFileMessageUseCaseSuccessResponse = {
  isSuccess: true
}

type SendFileMessageUseCaseErrorResponse = {
  isSuccess: false
  error: string
}

type SendFileMessageUseCaseResponse =
  | SendFileMessageUseCaseSuccessResponse
  | SendFileMessageUseCaseErrorResponse

class sendFileMessageUseCase {
  constructor() {}

  async execute(
    params: sendFileMessageUseCaseParams
  ): Promise<SendFileMessageUseCaseResponse> {
    const safeParams = sendFileMessageUseCaseParams.safeParse(params)

    if (!safeParams.success) {
      throw new InvalidInputError(
        safeParams.error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ')
      )
    }

    try {
      const { data } = safeParams

      for (let i = 0; i < data.files.length; i++) {
        const file = data.files[i]
        const parentfolder = data.parentfolder[i]

        const params = {
          QueueUrl: env.SQS_URL,
          MessageBody: JSON.stringify({
            userId: data.userId,
            file: {
              name: file.originalname,
              mimetype: file.mimetype,
              path: file.path,
              parentfolder,
            },
          }),
        }

        const command = new SendMessageCommand(params)
        await sqsClient.send(command)
        // TODO Handle if response isnt 200
      }

      return {
        isSuccess: true,
      }
    } catch (err: any) {
      console.error('Error sending message to queue:', err)
      return {
        isSuccess: false,
        error: err.message || 'Unexpected error',
      }
    }
  }
}

export default sendFileMessageUseCase
