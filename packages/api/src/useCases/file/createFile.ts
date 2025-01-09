import { z } from 'zod'
import { File, Prisma } from '@prisma/client'

import InvalidInputError from '../errors/invalidInputError'
import IFileRepository from '../../repository/IFileRepository'

const createFileUseCaseParams = z.object({
  userId: z.string(),
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

type createFileUseCaseParams = z.infer<typeof createFileUseCaseParams>

type CreateFileUseCaseResponse = {
  files: File[]
}

class createFileUseCase {
  constructor(private fileRepo: IFileRepository) {}

  async execute(
    params: createFileUseCaseParams
  ): Promise<CreateFileUseCaseResponse> {
    const safeParams = createFileUseCaseParams.safeParse(params)

    if (!safeParams.success) {
      throw new InvalidInputError(
        safeParams.error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ')
      )
    }

    try {
      const {
        data: { userId, files },
      } = safeParams

      const filesToCreate: Prisma.FileUncheckedCreateInput[] = []
      for (const f of files) {
        filesToCreate.push({
          name: f.filename,
          path: `${userId}/${f.filename}`,
          type: 'FILE',
          userId,
        })
      }
      const dbFiles = await this.fileRepo.createFiles(filesToCreate)

      return {
        files: dbFiles,
      }
    } catch (err: any) {
      // TODO Handle DB Errors
      console.log('Error in createFileUseCase: ', err)
      throw err
    }
  }
}

export default createFileUseCase
