import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'

import env from './utils/env'
import { connectToDatabase } from './utils/db'

import loadPassportPlugin from './plugins/passport'
import loadSecureSession from './plugins/secureSession'
import { loadMulter, multer } from './plugins/multer'

import authController from './http/controllers/authController'
import userController from './http/controllers/userController'

class Server {
  server: FastifyInstance

  public async init(): Promise<void> {
    this.server = fastify({
      // logger: true,
    })

    await connectToDatabase()
    await this.startPlugins()
    await this.startRoutes()
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
    await loadMulter(this.server)

    this.server.setErrorHandler((error, _req, rep) => {
      console.log(error)
      rep.status(500).send({ error: 'Internal Server Error' })
    })
  }

  async startRoutes(): Promise<void> {
    this.server.get('/api', (_req, rep) => {
      rep.send({
        isSuccess: true,
        message: 'Hello World!',
      })
    })

    await authController(this.server)
    await userController(this.server)

    this.server.post(
      '/upload',
      { preHandler: multer.array('files') },
      (req, rep) => {
        rep.send({
          isSuccess: true,
        })
      }
    )
  }
}

export default Server
