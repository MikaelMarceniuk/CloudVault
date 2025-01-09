import { File, Prisma } from '@prisma/client'
import IFileRepository from '../IFileRepository'
import { db } from '../../utils/db'

class PrismaFileRepo implements IFileRepository {
  async createFile(file: Prisma.FileUncheckedCreateInput): Promise<File> {
    return await db.file.create({
      data: file,
    })
  }
}

export default PrismaFileRepo
