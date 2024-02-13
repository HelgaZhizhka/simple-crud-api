import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from '../services/userService'

describe('UserService', () => {
  it('should create a new user', () => {
    const userData = {
      id: '808004d6-c5b7-4f8c-b660-ea0da6a65c11',
      username: 'Test User',
      age: 30,
      hobbies: ['Reading'],
    }
    const user = createUser(userData)

    expect(user).toEqual(
      expect.objectContaining({ ...userData, id: expect.any(String) })
    )
  })

  it('should return a user by ID', () => {
    const userData = {
      id: '808004d6-c5b7-4f8c-b660-ea0da6a65c11',
      username: 'Test User',
      age: 30,
      hobbies: ['Reading'],
    }
    const newUser = createUser(userData)
    const foundUser = getUserById(newUser.id)

    expect(foundUser).toEqual(
      expect.objectContaining({
        username: userData.username,
        age: userData.age,
        hobbies: userData.hobbies,
        id: expect.any(String),
      })
    )
  })

  it('should update a user', () => {
    const userData = {
      id: '808004d6-c5b7-4f8c-b660-ea0da6a65c11',
      username: 'Test User',
      age: 30,
      hobbies: ['Reading'],
    }
    const newUser = createUser(userData)

    const updatedUserData = { ...userData, age: 31 }
    updateUser(newUser.id, updatedUserData)

    const updatedUser = getUserById(newUser.id)
    expect(updatedUser).toEqual(
      expect.objectContaining({ ...updatedUserData, id: expect.any(String) })
    )
  })

  it('should delete a user', () => {
    const userData = {
      id: '808004d6-c5b7-4f8c-b660-ea0da6a65c11',
      username: 'Test User',
      age: 30,
      hobbies: ['Reading'],
    }
    const newUser = createUser(userData)

    const isDeleted = deleteUser(newUser.id)
    expect(isDeleted).toBeTruthy()

    const foundUser = getUserById(newUser.id)
    expect(foundUser).toBeUndefined()
  })
})
