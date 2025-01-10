import { FastifyInstance } from 'fastify'
import fastifyPassport from '@fastify/passport'

const authController = (server: FastifyInstance) => {
  server.get(
    '/auth/discord/callback',
    {
      preValidation: fastifyPassport.authenticate('discord'),
    },
    async (req, rep) => {
      rep.redirect('http://localhost:3000/home')
    }
  )

  server.get('/api/logout', (req, rep) => {
    req.logout()
    rep.send({
      isSuccess: true,
    })
  })
}

export default authController
