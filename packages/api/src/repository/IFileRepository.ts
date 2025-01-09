import { File, Prisma } from '@prisma/client'

export type IFindByPathAndUserId = {
  path: string
  userId: string
}

interface IFileRepository {
  findByPathAndUserId(params: IFindByPathAndUserId): Promise<File[] | null>
  createFile(file: Prisma.FileUncheckedCreateInput): Promise<File>
}

export default IFileRepository
