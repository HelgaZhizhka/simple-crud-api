import cluster from 'cluster'
import http from 'http'
import os from 'os'
import 'dotenv/config'
import { startServer } from './app'

const serverPort = parseInt(process.env.PORT || '4000', 10)
const numCPUs = os.availableParallelism
  ? os.availableParallelism() - 1
  : os.cpus().length - 1

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ PORT_FOR_WORKER: `${serverPort + i + 1}` })
  }

  const workerPorts = [...Array(numCPUs).keys()].map((i) => serverPort + i + 1)
  let roundRobinIndex = 0

  http
    .createServer((req, res) => {
      const workerPort = workerPorts[roundRobinIndex++ % numCPUs]
      const options = {
        hostname: 'localhost',
        port: workerPort,
        path: req.url,
        method: req.method,
        headers: req.headers,
      }
      
      const proxyReq = http.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 500, proxyRes.headers)
        proxyRes.pipe(res, { end: true })
      })
      
      req.pipe(proxyReq, { end: true })
      proxyReq.on('error', (err) => {
        console.error(`Error proxying request to ${workerPort}:`, err)
        res.writeHead(502)
        res.end('Service unavailable')
      })
      console.log(`Request handled by worker ${process.pid} workerPort ${workerPort}`)
    })
    .listen(serverPort, () => {
      console.log(`Worker ${process.pid} started on port ${serverPort}`)
      console.log(`Load balancer is running on http://localhost:${serverPort}`)
    })
} else {
  const workerPort = parseInt(process.env.PORT_FOR_WORKER ?? '', 10)
  startServer(workerPort)
}
