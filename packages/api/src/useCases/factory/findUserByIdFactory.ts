import PrismaUserRepo from '../../repository/prisma/userRepo'
import findUserByIdUseCase from '../users/findUserById'

const findUserByIdFactory = () => {
  const userRepo = new PrismaUserRepo()

  return new findUserByIdUseCase(userRepo)
}

export default findUserByIdFactory
