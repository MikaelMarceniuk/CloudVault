import { File, Prisma } from '@prisma/client'

interface IFileRepository {
  createFile(file: Prisma.FileUncheckedCreateInput): Promise<File>
}

export default IFileRepository
