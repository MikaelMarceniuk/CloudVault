import { z } from 'zod'
import IUserRepository from '../../repository/IUserRepository'
import { User } from '@prisma/client'
import InvalidInputError from '../errors/invalidInputError'

const createUserByProviderUseCaseParams = z.object({
  name: z.string(),
  email: z.string().email(),
  provider: z.enum(['discord']),
  providerAccountId: z.string(),
})

type CreateUserByProviderUseCaseParams = z.infer<
  typeof createUserByProviderUseCaseParams
>

type CreateUserByProviderUseCaseResponse = {
  user: User
}

class createUserByProviderUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(
    params: CreateUserByProviderUseCaseParams
  ): Promise<CreateUserByProviderUseCaseResponse> {
    const safeParams = createUserByProviderUseCaseParams.safeParse(params)

    if (!safeParams.success) {
      throw new InvalidInputError(
        safeParams.error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ')
      )
    }

    try {
      const {
        data: { name, email, provider, providerAccountId },
      } = safeParams

      const createdUser = await this.userRepo.createUser({
        name,
        email,
        provider,
        providerAccountId,
      })

      return {
        user: createdUser,
      }
    } catch (err: any) {
      // TODO Handle DB Errors
      console.log('Error in CreateUserByProviderUseCase: ', err)
      throw err
    }
  }
}

export default createUserByProviderUseCase
