import { ServerResponse } from 'http'

const sendJsonResponse = <T>(
  res: ServerResponse,
  data: T,
  statusCode: number = 200
): void => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

export default sendJsonResponse
