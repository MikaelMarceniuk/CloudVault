import Server from './server'

const server = new Server()

;(async () => {
  await server.init()
  await server.listen()
})()
