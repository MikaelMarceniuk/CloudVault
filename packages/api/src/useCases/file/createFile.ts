import { File } from '@prisma/client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
} from '@aws-sdk/client-sqs'
import fs from 'fs/promises'

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

class CreateFileUseCase {
  constructor(private fileRepo: IFileRepository) {}

  async execute(): Promise<void> {
    const params = {
      QueueUrl: env.SQS_URL,
      MaxNumberOfMessages: 5,
      WaitTimeSeconds: 5,
    }

    const command = new ReceiveMessageCommand(params)

    try {
      const response = await sqsClient.send(command)

      if (!response.Messages) return

      for (const { ReceiptHandle, Body } of response.Messages) {
        const { userId, file } = JSON.parse(Body!) as SQSMessage

        const isRootFolder = file.parentfolder === '/'
        const parentFolders = isRootFolder ? [] : file.parentfolder.split('/')

        // Construa o caminho do arquivo completo no S3
        const fileKey = `${userId}/${file.parentfolder}/${file.name}`

        // Envie o arquivo para o S3
        await this.uploadFileToS3(fileKey, file)

        // Salve a hierarquia de diretórios e o arquivo no banco de dados
        await this.saveHierarchyToDatabase(
          userId,
          parentFolders,
          fileKey,
          file.name
        )

        // Exclua a mensagem da fila após o processamento
        await this.deleteMessageFromQueue(ReceiptHandle!)
      }
    } catch (err) {
      console.error('Error in CreateFileUseCase:', err)
      throw err
    }
  }

  private async uploadFileToS3(fileKey: string, file: SQSMessage['file']) {
    const putObjectCommand = new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: fileKey,
      Body: await fs.readFile(file.path),
      ContentType: file.mimetype,
      ACL: 'public-read',
    })

    const { $metadata: s3Metadata } = await s3Client.send(putObjectCommand)

    if (s3Metadata.httpStatusCode !== 200) {
      throw new Error('Failed to upload file to S3')
    }
  }

  private async saveHierarchyToDatabase(
    userId: string,
    parentFolders: string[],
    fileKey: string,
    fileName: string
  ) {
    let lastInsertedFolder: File | null = null
    const bucketUrl = `https://${env.S3_BUCKET}.s3.us-east-2.amazonaws.com`

    for (const folder of parentFolders) {
      const folderPath = `${bucketUrl}/${userId}/${parentFolders
        .slice(0, parentFolders.indexOf(folder) + 1)
        .join('/')}`

      const existingFile = await this.fileRepo.findByPathAndUserId({
        path: folderPath,
        userId,
      })

      if (existingFile && existingFile?.length > 0) continue

      const isThereParent =
        lastInsertedFolder?.id && lastInsertedFolder?.type == 'FOLDER'

      lastInsertedFolder = await this.fileRepo.createFile({
        name: folder,
        path: folderPath,
        type: 'FOLDER',
        parentId: isThereParent ? lastInsertedFolder?.id : undefined,
        userId,
      })
    }

    // Salve o arquivo no banco de dados
    await this.fileRepo.createFile({
      name: fileName,
      path: `${bucketUrl}/${fileKey}`,
      type: 'FILE',
      parentId: lastInsertedFolder?.id || null,
      userId,
    })
  }

  private async deleteMessageFromQueue(receiptHandle: string) {
    const deleteParams = {
      QueueUrl: env.SQS_URL,
      ReceiptHandle: receiptHandle,
    }

    const deleteCommand = new DeleteMessageCommand(deleteParams)
    const { $metadata: delMetadata } = await sqsClient.send(deleteCommand)

    if (delMetadata.httpStatusCode !== 200) {
      throw new Error('Failed to delete message from SQS')
    }
  }
}

export default CreateFileUseCase
