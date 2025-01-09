import PrismaFileRepo from '../../repository/prisma/fileRepo'
import createFileUseCase from '../file/createFile'

const createFileFactory = () => {
  const fileRepo = new PrismaFileRepo()

  return new createFileUseCase(fileRepo)
}

export default createFileFactory
