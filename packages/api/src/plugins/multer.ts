import { FastifyInstance } from 'fastify'
import fastifyMulter from 'fastify-multer'
import path from 'path'
import fs from 'fs/promises'

export const multer = fastifyMulter({
  storage: fastifyMulter.diskStorage({
    destination: async (req, file, cb) => {
      const user = req.user

      if (!user) {
        cb(new Error('User not authenticated'), '')
        return
      }

      const uploadsFolder = path.join(__dirname, '..', '..', 'uploads', user.id)
      await fs.mkdir(uploadsFolder, { recursive: true })
      cb(null, uploadsFolder)
    },
    filename: (_req, { originalname }, cb) => {
      const filename = originalname.split('.')
      const fileExt = filename.pop()

      cb(null, `${filename}-${Date.now()}.${fileExt}`)
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
