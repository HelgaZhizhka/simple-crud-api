import { IncomingMessage } from 'http'

const parseRequestBody = <T>(req: IncomingMessage): Promise<T> =>
  new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      try {
        resolve(JSON.parse(body) as T)
      } catch (error) {
        reject(error)
      }
    })
  })

export default parseRequestBody
