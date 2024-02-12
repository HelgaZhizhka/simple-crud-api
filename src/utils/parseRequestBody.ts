import { IncomingMessage } from 'http'

const parseRequestBody = <T>(req: IncomingMessage): Promise<T> =>
  new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      if (body.trim() === '') {
        reject(new Error('Empty request body'))
        return
      }
      try {
        const parsed = JSON.parse(body)
        resolve(parsed as T)
      } catch (error) {
        reject(new Error('Invalid JSON format'))
      }
    })
  })

export default parseRequestBody
