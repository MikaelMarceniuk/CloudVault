import { z } from 'zod'
import { File } from '@prisma/client'

import IFileRepository from '../../repository/IFileRepository'

const GetUserFilesUseCaseParams = z.object({
  userId: z.string().uuid(),
  path: z.string(),
})

type GetUserFilesUseCaseParams = z.infer<typeof GetUserFilesUseCaseParams>

type GetUserFilesUseCaseResponse = {
  files: File[]
}

class GetUserFilesUseCase {
  constructor(private fileRepo: IFileRepository) {}

  async execute({
    userId,
    path,
  }: GetUserFilesUseCaseParams): Promise<GetUserFilesUseCaseResponse> {
    console.log('path: ', path)

    try {
      const userFiles = await this.fileRepo.findByUserId(userId)
      const lastFolderName = path.split('/').pop()

      if (lastFolderName == '') {
        return {
          files: userFiles.filter((f) => !f.parentId),
        }
      }

      const folder = userFiles.find((f) => f.name == lastFolderName)
      return {
        files: userFiles.filter((f) => f.parentId == folder?.id),
      }
    } catch (err) {
      console.error('Error in GetUserFilesUseCase:', err)
      throw err
    }
  }
}

export default GetUserFilesUseCase
