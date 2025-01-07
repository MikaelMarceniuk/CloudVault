import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import env from './utils/env'

class Server {
  server: FastifyInstance

  public async init(): Promise<void> {
    this.server = fastify({
      logger: true,
    })

    this.startPlugins()
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

  startPlugins(): void {
    this.server.register(cors, {
      origin: '*',
    })

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
  }
}

export default Server
