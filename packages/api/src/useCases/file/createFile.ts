import fs from 'fs/promises'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
} from '@aws-sdk/client-sqs'

import IFileRepository from '../../repository/IFileRepository'
import env from '../../utils/env'
import s3Client from '../../utils/s3'
import sqsClient from '../../utils/sqs'

type SQSMessage = {
  userId: string
  file: {
    name: string
    mimetype: string
    path: string
    parentfolder: string
  }
}

class createFileUseCase {
  constructor(private fileRepo: IFileRepository) {}

  async execute(): Promise<void> {
    const params = {
      QueueUrl: env.SQS_URL,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 5,
    }

    const command = new ReceiveMessageCommand(params)

    try {
      const response = await sqsClient.send(command)

      if (!response.Messages) return

      for (const { ReceiptHandle, Body } of response.Messages) {
        // TODO Refactor
        const { userId, file } = JSON.parse(Body!) as SQSMessage

        const isRootFolder = file.parentfolder == '/'
        const filename = isRootFolder
          ? file.name
          : `${file.parentfolder}/${file.name}`
        const fileKey = `${userId}/${filename}`

        const putObjectCommand = new PutObjectCommand({
          Bucket: env.S3_BUCKET,
          Key: fileKey,
          Body: await fs.readFile(file.path),
          ContentType: file.mimetype,
          ACL: 'public-read',
        })

        const { $metadata: s3Metadata } = await s3Client.send(putObjectCommand)
        // TODO Handle s3 fail
        if (s3Metadata.httpStatusCode != 200) return

        // TODO Handle Db fail
        const fileHierarq = filename.split('/')
        for (const pathname of fileHierarq) {
          const isFile =
            fileHierarq.findIndex((p) => p == pathname) ==
            fileHierarq.length - 1

          await this.fileRepo.createFile({
            name: pathname,
            path: `https://${env.S3_BUCKET}.s3.us-east-2.amazonaws.com/${fileKey}`,
            type: isFile ? 'FILE' : 'FOLDER',
            userId,
          })
        }

        await fs.unlink(file.path)

        // Exclua a mensagem da fila após o processamento
        const deleteParams = {
          QueueUrl: env.SQS_URL,
          ReceiptHandle: ReceiptHandle,
        }
        const deleteCommand = new DeleteMessageCommand(deleteParams)
        const { $metadata: delMetadata } = await sqsClient.send(deleteCommand)

        // TODO Handle sqs fail
        if (delMetadata.httpStatusCode != 200) return
      }
    } catch (err: any) {
      // TODO Handle DB Errors
      console.log('Error in createFileUseCase: ', err)
      throw err
    }
  }
}

export default createFileUseCase
