import { FastifyInstance } from 'fastify'
import { multer } from '../../plugins/multer'
import PrismaFileRepo from '../../repository/prisma/fileRepo'
import createFileUseCase from '../../useCases/file/createFile'
import sendFileMessageUseCase from '../../useCases/file/sendFileMessage'
import createFileFactory from '../../useCases/factory/createFile'

const fileController = (server: FastifyInstance) => {
  server.post(
    '/api/file',
    { preHandler: multer.array('files') },
    async (req, rep) => {
      // TODO Fix this warnings
      await new sendFileMessageUseCase().execute({
        userId: req.user.id,
        files: req.files,
      })

      rep.send({
        isSuccess: true,
      })
    }
  )

  server.post('/api/file/consume', async (_req, rep) => {
    await createFileFactory().execute()

    rep.send({
      isSuccess: true,
    })
  })
}

export default fileController
