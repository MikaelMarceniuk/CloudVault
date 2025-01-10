import PrismaFileRepo from '../../repository/prisma/fileRepo'
import GetUserFilesUseCase from '../file/getUserFiles'

const getUserFilesFactory = () => {
  const fileRepo = new PrismaFileRepo()

  return new GetUserFilesUseCase(fileRepo)
}

export default getUserFilesFactory
