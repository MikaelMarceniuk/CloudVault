import { File, Prisma } from '@prisma/client'
import IFileRepository, {
  IFindByNameAndUserId,
  IFindByPathAndUserId,
} from '../IFileRepository'
import { db } from '../../utils/db'

class PrismaFileRepo implements IFileRepository {
  async findByUserId(userId: string): Promise<File[]> {
    return await db.file.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    })
  }

  async findByPathAndUserId({
    path,
    userId,
  }: IFindByPathAndUserId): Promise<File[]> {
    return await db.file.findMany({
      where: {
        path: {
          equals: path,
        },
        userId: {
          equals: userId,
        },
      },
    })
  }

  async findByNameAndUserId({
    name,
    userId,
  }: IFindByNameAndUserId): Promise<File[]> {
    return await db.file.findMany({
      where: {
        name: {
          equals: name,
        },
        userId: {
          equals: userId,
        },
      },
    })
  }

  async createFile(file: Prisma.FileUncheckedCreateInput): Promise<File> {
    return await db.file.create({
      data: file,
    })
  }
}

export default PrismaFileRepo
