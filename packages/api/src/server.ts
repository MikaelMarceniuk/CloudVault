import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import env from './utils/env'

import loadPassportPlugin from './plugins/passport'
import loadSecureSession from './plugins/secureSession'

class Server {
  server: FastifyInstance

  public async init(): Promise<void> {
    this.server = fastify({
      logger: true,
    })

    await this.startPlugins()
    this.startRoutes()
  }

  public async listen(): Promise<void> {
    try {
      await this.server.listen({ port: env.PORT })
      this.server.log.info(`Server running on port ${env.PORT}`)
    } catch (err) {
      this.server.log.error(`Error in listen: `, err)
      process.exit(1)
    }
  }

  async startPlugins(): Promise<void> {
    this.server.register(cors, {
      origin: 'http://localhost:3000',
      credentials: true,
    })

    await loadSecureSession(this.server)
    await loadPassportPlugin(this.server)

    this.server.setErrorHandler((error, _req, rep) => {
      this.server.log.error(error)
      rep.status(500).send({ error: 'Internal Server Error' })
    })
  }

  startRoutes(): void {
    this.server.get('/api', (_req, rep) => {
      rep.send({
        isSuccess: true,
        message: 'Hello World!',
      })
    })

    this.server.get('/user', (req, rep) => {
      if (req.user) {
        rep.send({
          id: req.user.id,
          username: req.user.username,
        })
        return
      }

      rep.send(null)
    })
  }
}

export default Server
