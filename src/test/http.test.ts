import { createServer } from 'http'
import supertest, { SuperTest, Test, Response } from 'supertest'
import TestAgent from 'supertest/lib/agent'

import { serverHandler } from '../serverHandler'

export const createTestServer = () => createServer(serverHandler)

describe('API Tests', () => {
  let request: TestAgent<Test>
  let userId: string

  beforeAll(() => {
    const server = createTestServer()
    request = supertest.agent(server)
  })

  it('should return an empty array of users', async () => {
    const response = await request.get('/api/users')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })

  it('should create a new user', async () => {
    const newUser = {
      username: 'TestUser',
      age: 25,
      hobbies: ['Reading', 'Coding'],
    }
    const response = await request.post('/api/users').send(newUser)
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('id')
    userId = response.body.id
  })

  it('should get the created user by id', async () => {
    const response = await request.get(`/api/users/${userId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('username', 'TestUser')
  })

  it('should update the created user', async () => {
    const updatedUser = {
      username: 'UpdatedUser',
      age: 26,
      hobbies: ['Reading', 'Coding', 'Hiking'],
    }
    const response = await request.put(`/api/users/${userId}`).send(updatedUser)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('username', 'UpdatedUser')
  })

  it('should delete the created user', async () => {
    const response = await request.delete(`/api/users/${userId}`)
    expect(response.statusCode).toBe(204)
  })

  it('should return 404 for the deleted user', async () => {
    const response = await request.get(`/api/users/${userId}`)
    expect(response.statusCode).toBe(404)
  })

})
