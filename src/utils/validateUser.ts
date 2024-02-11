import { User } from '../db'

const validateUser = (
  userData: Partial<User>
): { valid: boolean; message?: string } => {
  if (!userData.username || typeof userData.username !== 'string') {
    return {
      valid: false,
      message: 'Username is required and must be a string.',
    }
  }

  if (typeof userData.age !== 'number' || userData.age < 0) {
    return {
      valid: false,
      message: 'Age is required and must be a positive number.',
    }
  }

  if (
    !Array.isArray(userData.hobbies) ||
    !userData.hobbies.every((hobby) => typeof hobby === 'string')
  ) {
    return { valid: false, message: 'Hobbies must be an array of strings.' }
  }

  if (
    userData.username === undefined ||
    userData.age === undefined ||
    userData.hobbies === undefined
  ) {
    return { valid: false, message: 'Missing required fields.' }
  }

  return { valid: true }
}

export default validateUser
