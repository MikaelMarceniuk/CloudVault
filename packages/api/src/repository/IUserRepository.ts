import { Prisma, User } from '@prisma/client'

interface IUserRepository {
  findById(userId: string): Promise<User | null>
  findByProviderId(providerId: string): Promise<User | null>

  createUser(data: Prisma.UserCreateInput): Promise<User>
}

export default IUserRepository
