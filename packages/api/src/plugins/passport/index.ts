import fastifyPassport, { Strategy } from '@fastify/passport'
import { FastifyInstance } from 'fastify'
import loadDiscordStrategy from './discordStrategy'

const loadPassportPlugin = (server: FastifyInstance) => {
  server.register(fastifyPassport.initialize())
  server.register(fastifyPassport.secureSession())

  fastifyPassport.registerUserSerializer(async (user, req) => {
    return user
  })

  fastifyPassport.registerUserDeserializer(async (user, req) => {
    return user
  })

  loadDiscordStrategy(server)

  server.get('/logout', (req, rep) => {
    req.logout()
    rep.send({
      isSuccess: true,
    })
  })
}

export default loadPassportPlugin
