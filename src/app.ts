import { createServer } from 'http'
import 'dotenv/config'

import { serverHandler } from './serverHandler'

export const port = parseInt(process.env.PORT || '3000', 10)

export const startServer = (port: number) => {
  const server = createServer(serverHandler)
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}
