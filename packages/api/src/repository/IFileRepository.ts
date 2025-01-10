import { File, Prisma } from '@prisma/client'

export type IFindByPathAndUserId = {
  path: string
  userId: string
}

export type IFindByNameAndUserId = {
  name: string
  userId: string
}

interface IFileRepository {
  findByUserId(userId: string): Promise<File[]>
  findByPathAndUserId(params: IFindByPathAndUserId): Promise<File[]>
  findByNameAndUserId(params: IFindByNameAndUserId): Promise<File[]>
  createFile(file: Prisma.FileUncheckedCreateInput): Promise<File>
}

export default IFileRepository
