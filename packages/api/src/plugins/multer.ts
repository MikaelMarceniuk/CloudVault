import { FastifyInstance } from 'fastify'
import fastifyMulter from 'fastify-multer'
import path from 'path'
import fs from 'fs/promises'

const uploadsFolder = path.join(__dirname, '..', '..', 'uploads')
fs.mkdir(uploadsFolder, { recursive: true })

export const multer = fastifyMulter({
  storage: fastifyMulter.diskStorage({
    destination: async (req, file, cb) => {
      cb(null, uploadsFolder)
    },
    filename: (_req, { originalname }, cb) => {
      const fileExt = originalname.split('.').pop()
      cb(null, `${originalname}-${Date.now()}.${fileExt}`)
    },
  }),
})

export const loadMulter = (server: FastifyInstance) => {
  server.addContentTypeParser(
    'multipart/form-data',
    (_request, _payload, done) => {
      done(null)
    }
  )
}
