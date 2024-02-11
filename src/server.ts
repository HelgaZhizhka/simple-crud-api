import { IncomingMessage, ServerResponse } from 'http'
import { usersRouter } from './controllers/usersController'

type RouteHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  userId?: string
) => void

const routes: Record<string, RouteHandler> = {
  '/api/users': usersRouter,
}

export const server = (req: IncomingMessage, res: ServerResponse): void => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  const { url, method } = req

  if (!url || !method) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Bad Request' }))
    return
  }
  const reqUrl = new URL(url, `http://${req.headers.host}`)
  const pathname = reqUrl.pathname

  const routeHandlerKey = Object.keys(routes).find((routePath) =>
    pathname.startsWith(routePath)
  )

  if (routeHandlerKey) {
    const pathSegments = pathname.split('/').filter(Boolean)
    const userId = pathSegments[2]
    routes[routeHandlerKey](req, res, userId)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Not Found' }))
  }
}
