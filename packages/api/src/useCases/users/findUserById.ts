import { z } from 'zod'
import IUserRepository from '../../repository/IUserRepository'
import { User } from '@prisma/client'
import InvalidInputError from '../errors/invalidInputError'

const findUserByIdUseCaseParams = z.object({
  userId: z.string(),
})

type findUserByIdUseCaseParams = z.infer<typeof findUserByIdUseCaseParams>

type findUserByIdUseCaseResponse = {
  user: User | null
}

class findUserByIdUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(
    params: findUserByIdUseCaseParams
  ): Promise<findUserByIdUseCaseResponse> {
    const safeParams = findUserByIdUseCaseParams.safeParse(params)

    if (!safeParams.success) {
      throw new InvalidInputError(
        safeParams.error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ')
      )
    }

    try {
      const {
        data: { userId },
      } = safeParams

      const userByProviderPromise = this.userRepo.findByProviderId(userId)
      const userByIdPromise = this.userRepo.findById(userId)

      const [userByProvider, userById] = await Promise.all([
        userByProviderPromise,
        userByIdPromise,
      ])

      return {
        user: userByProvider || userById,
      }
    } catch (err: any) {
      // TODO Handle DB Errors
      console.log('Error in findUserByIdUseCase: ', err)
      throw err
    }
  }
}

export default findUserByIdUseCase
