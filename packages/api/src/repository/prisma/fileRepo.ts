import { File } from '@prisma/client'
import IFileRepository from '../IFileRepository'
import { db } from '../../utils/db'

class PrismaFileRepo implements IFileRepository {
  async createFiles(file: File[]): Promise<File[]> {
    return await db.file.createManyAndReturn({
      data: file,
    })
  }
}

export default PrismaFileRepo
