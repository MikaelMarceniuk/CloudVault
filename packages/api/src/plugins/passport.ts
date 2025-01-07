import fastifyPassport from '@fastify/passport'
import DiscordStrategy from 'passport-discord'
import { FastifyInstance } from 'fastify'
import env from '../utils/env'

const cookieDefaultConfig = {
  path: '/',
  httpOnly: true,
  secure: true,
}

const loadPassportPlugin = (server: FastifyInstance) => {
  server.register(fastifyPassport.initialize())
  server.register(fastifyPassport.secureSession())

  fastifyPassport.registerUserSerializer(async (user, req) => {
    return user
  })

  fastifyPassport.registerUserDeserializer(async (user, req) => {
    return user
  })

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
      const sessionCookie = req.cookies.session
      rep.setCookie('session', sessionCookie!, cookieDefaultConfig)
      rep.redirect('http://localhost:3000')
    }
  )

  server.get('/logout', (req, rep) => {
    req.logout()
    rep.clearCookie('session', cookieDefaultConfig)
    rep.send({
      isSuccess: true,
    })
  })
}

export default loadPassportPlugin
