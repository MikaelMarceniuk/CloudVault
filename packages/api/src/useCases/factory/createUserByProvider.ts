import PrismaUserRepo from '../../repository/prisma/userRepo'
import createUserByProviderUseCase from '../users/createUserByProvider'

const createUserByProviderFactory = () => {
  const userRepo = new PrismaUserRepo()

  return new createUserByProviderUseCase(userRepo)
}

export default createUserByProviderFactory
