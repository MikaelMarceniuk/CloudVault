import { FastifyInstance } from 'fastify'
import fastifySecureSession from '@fastify/secure-session'
import fs from 'fs/promises'
import path from 'path'

const loadSecureSession = async (server: FastifyInstance) => {
  const secretKey = await fs.readFile(
    path.join(__dirname, '..', '..', 'key', 'secret-key')
  )

  server.register(fastifySecureSession, {
    // the name of the attribute decorated on the request-object, defaults to 'session'
    // sessionName: 'session',
    // the name of the session cookie, defaults to value of sessionName
    // cookieName: 'my-session-cookie',
    // adapt this to point to the directory where secret-key is located
    key: secretKey,
    // the amount of time the session is considered valid; this is different from the cookie options
    // and based on value wihin the session.
    // expiry: 24 * 60 * 60, // Default 1 day
    cookie: {
      path: '/',
      httpOnly: true,
      secure: true,
    },
  })
}

export default loadSecureSession
