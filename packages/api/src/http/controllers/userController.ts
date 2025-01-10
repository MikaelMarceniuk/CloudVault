import { FastifyInstance } from 'fastify'

const userController = (server: FastifyInstance) => {
  server.get('/api/user', async (req, rep) => {
    if (req.user) {
      // TODO Type PassportUser
      rep.status(200).send({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      })
      return
    }

    rep.status(401).send({ error: 'User not found.' })
  })
}

export default userController
