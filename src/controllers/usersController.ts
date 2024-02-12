import { IncomingMessage, ServerResponse } from 'http'
import { validate as uuidValidate } from 'uuid'

import * as userService from '../services/userService'
import {
  parseRequestBody,
  sendJsonResponse,
  validateUser,
} from '../utils/index'
import { User } from '../db'

export const usersRouter = async (
  req: IncomingMessage,
  res: ServerResponse,
  pathUserId?: string
): Promise<void> => {
  try {
    if (pathUserId && !uuidValidate(pathUserId)) {
      sendJsonResponse(res, { error: 'Invalid userId' }, 400)
      return
    }

    switch (req.method) {
      case 'GET':
        if (pathUserId) {
          const user = userService.getUserById(pathUserId)
          if (user) {
            sendJsonResponse(res, user, 200)
          } else {
            sendJsonResponse(res, { error: 'User not found' }, 404)
          }
        } else {
          const users = userService.getAllUsers()
          sendJsonResponse(res, users, 200)
        }
        break
      case 'POST':
        if (pathUserId) {
          sendJsonResponse(
            res,
            { error: 'POST request does not require userId in URL' },
            400
          )
          return
        }

        const newUser = await parseRequestBody<User>(req)
        const validationResult = validateUser(newUser)

        if (!validationResult.valid) {
          sendJsonResponse(res, { error: validationResult.message }, 400)
          return
        }
        
        const createdUser = userService.createUser(newUser)
        sendJsonResponse(res, createdUser, 201)
        break
      case 'PUT':
        if (!pathUserId) {
          sendJsonResponse(res, { error: 'User ID is required for PUT' }, 400)
          return
        }
        const userData = await parseRequestBody<Partial<User>>(req)
        const validationPutResult = validateUser(userData, true)
        if (!validationPutResult.valid) {
          sendJsonResponse(res, { error: validationPutResult.message }, 400)
          return
        }
        const updatedUser = userService.updateUser(pathUserId, userData)
        if (updatedUser) {
          sendJsonResponse(res, updatedUser, 200)
        } else {
          sendJsonResponse(res, { error: 'User not found' }, 404)
        }
        break
      case 'DELETE':
        if (!pathUserId) {
          sendJsonResponse(
            res,
            { error: 'User ID is required for DELETE' },
            400
          )
          return
        }
        const isDeleted = userService.deleteUser(pathUserId)
        if (isDeleted) {
          res.writeHead(204)
          res.end()
        } else {
          sendJsonResponse(res, { error: 'User not found' }, 404)
        }
        break
      default:
        sendJsonResponse(res, { error: 'Method not allowed' }, 405)
    }
  } catch (error) {
    console.error('Error handling request', error)
    sendJsonResponse(res, { error: 'Internal server error' }, 500)
  }
}
