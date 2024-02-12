import 'dotenv/config'
import http from 'http'

const PORT = process.env.PORT || 3000
let createdUserId = ''

describe('API integration tests', () => {
  const baseUrl = 'http://localhost:3000'

  it('POST /api/users should create a new user', (done) => {
    const data = JSON.stringify({
      username: 'New User',
      age: 25,
      hobbies: ['hobby1', 'hobby2'],
    })

    const options = {
      hostname: 'localhost',
      port: PORT,
      path: '/api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    }

    const req = http.request(options, (res) => {
      expect(res.statusCode).toBe(201)
      let responseData = ''
      res.on('data', (chunk) => {
        responseData += chunk
      })
      res.on('end', () => {
        const user = JSON.parse(responseData)
        expect(user).toEqual(
          expect.objectContaining({
            username: 'New User',
            age: 25,
            hobbies: expect.arrayContaining(['hobby1', 'hobby2']),
          })
        )
        done()
      })
    })

    req.on('error', (error) => done(error))
    req.write(data)
    req.end()
  })
})
