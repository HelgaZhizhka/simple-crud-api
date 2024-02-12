import { createServer } from 'http'
import 'dotenv/config'

import { server } from './server'

export const port = parseInt(process.env.PORT || '3000', 10)

export const startServer = (port: number) => {
  createServer(server).listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

startServer(port)
