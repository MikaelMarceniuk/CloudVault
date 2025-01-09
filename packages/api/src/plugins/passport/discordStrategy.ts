import fastifyPassport from '@fastify/passport'
import { FastifyInstance } from 'fastify'
import DiscordStrategy from 'passport-discord'

import env from '../../utils/env'

import createUserByProviderFactory from '../../useCases/factory/createUserByProvider'
import findUserByProviderIdFactory from '../../useCases/factory/findUserByProvider'

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
      async (_acessToken, _refreshToken, profile, cb) => {
        const { user: dbUser } = await findUserByProviderIdFactory().execute({
          userId: profile.id,
        })
        if (dbUser) {
          cb(undefined, dbUser.id)
          return
        }

        const { user } = await createUserByProviderFactory().execute({
          name: profile.username || profile.global_name,
          email: profile.email,
          provider: 'discord',
          providerAccountId: profile.id,
        })
        cb(undefined, user.id)
      }
    )
  )
}

export default loadDiscordStrategy
