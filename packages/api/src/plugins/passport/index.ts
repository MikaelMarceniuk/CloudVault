import fastifyPassport from '@fastify/passport'
import { FastifyInstance } from 'fastify'
import { User } from '@prisma/client'

import loadDiscordStrategy from './discordStrategy'

import findUserByProviderIdFactory from '../../useCases/factory/findUserByProvider'

const loadPassportPlugin = (server: FastifyInstance) => {
  server.register(fastifyPassport.initialize())
  server.register(fastifyPassport.secureSession())

  fastifyPassport.registerUserSerializer(async (user: User, req) => {
    return user.id
  })

  fastifyPassport.registerUserDeserializer(async (userId: string, req) => {
    const { user } = await findUserByProviderIdFactory().execute({
      userId,
    })

    return user
  })

  loadDiscordStrategy(server)
}

export default loadPassportPlugin
