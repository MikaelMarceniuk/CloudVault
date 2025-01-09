import { FastifyInstance } from 'fastify'
import { multer } from '../../plugins/multer'
import createFileUseCase from '../../useCases/file/createFile'
import PrismaFileRepo from '../../repository/prisma/fileRepo'

const fileController = (server: FastifyInstance) => {
  server.post(
    '/api/file',
    { preHandler: multer.array('files') },
    async (req, rep) => {
      await new createFileUseCase(new PrismaFileRepo()).execute({
        userId: req.user.id,
        files: req.files,
      })

      rep.send({
        isSuccess: true,
      })
    }
  )
}

export default fileController
