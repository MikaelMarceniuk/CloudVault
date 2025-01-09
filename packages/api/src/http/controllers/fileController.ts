import { FastifyInstance } from 'fastify'
import { multer } from '../../plugins/multer'

import sendFileMessageUseCase from '../../useCases/file/sendFileMessage'
import createFileFactory from '../../useCases/factory/createFile'

const fileController = (server: FastifyInstance) => {
  server.post(
    '/api/file',
    { preHandler: multer.array('files') },
    async (req, rep) => {
      const parentfolder = req.body.parentfolder

      // TODO Fix this warnings
      const caseResp = await new sendFileMessageUseCase().execute({
        userId: req.user.id,
        files: req.files,
        parentfolder: Array.isArray(parentfolder)
          ? parentfolder
          : [parentfolder],
      })

      rep.send(caseResp)
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
