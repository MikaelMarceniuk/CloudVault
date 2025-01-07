import fastifyPassport from '@fastify/passport'
import { FastifyInstance } from 'fastify'
import DiscordStrategy from 'passport-discord'
import env from '../../utils/env'

const loadDiscordStrategy = (server: FastifyInstance) => {
  fastifyPassport.use(
    'discord',
    new DiscordStrategy.Strategy(
      {
        clientID: env.DISCORD_CLIENT_ID,
        clientSecret: env.DISCORD_SECRET,
        callbackURL: 'http://localhost:3333/auth/discord/callback',
        scope: ['identify', 'email'],
      },
      (acessToken, refreshToken, profile, cb) => {
        // Save profile on database
        // Return only profile.id in cookie
        cb(undefined, profile)
      }
    )
  )

  server.get(
    '/auth/discord/callback',
    {
      preValidation: fastifyPassport.authenticate('discord'),
    },
    async (req, rep) => {
      rep.redirect('http://localhost:3000')
    }
  )
}

export default loadDiscordStrategy
