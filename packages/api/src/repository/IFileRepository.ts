import { File, Prisma } from '@prisma/client'

interface IFileRepository {
  createFiles(file: Prisma.FileUncheckedCreateInput[]): Promise<File[]>
}

export default IFileRepository
