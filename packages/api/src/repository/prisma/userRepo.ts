import { Prisma, User } from '@prisma/client'
import IUserRepository from '../IUserRepository'
import { db } from '../../utils/db'

class PrismaUserRepo implements IUserRepository {
  async findById(userId: string): Promise<User | null> {
    return await db.user.findUnique({
      where: {
        id: userId,
      },
    })
  }

  async findByProviderId(userId: string): Promise<User | null> {
    return await db.user.findFirst({
      where: {
        providerAccountId: userId,
      },
    })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await db.user.create({
      data,
    })
  }
}

export default PrismaUserRepo
