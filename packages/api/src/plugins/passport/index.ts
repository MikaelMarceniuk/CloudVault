import fastifyPassport from '@fastify/passport'
import { FastifyInstance } from 'fastify'

import loadDiscordStrategy from './discordStrategy'
import findUserByIdFactory from '../../useCases/factory/findUserByIdFactory'

const loadPassportPlugin = (server: FastifyInstance) => {
  server.register(fastifyPassport.initialize())
  server.register(fastifyPassport.secureSession())

  fastifyPassport.registerUserSerializer(async (userId: string, req) => {
    return userId
  })

  fastifyPassport.registerUserDeserializer(async (userId: string, req) => {
    const { user } = await findUserByIdFactory().execute({
      userId,
    })

    return user
  })

  loadDiscordStrategy(server)
}

export default loadPassportPlugin
