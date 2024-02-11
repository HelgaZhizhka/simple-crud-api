import { User, users } from "../db";
import { generateUniqueId } from "../utils";

export const getAllUsers = (): User[] => users || [];

export const getUserById = (id: string): User | undefined =>
  users.find((user) => user.id === id)

export const createUser = (userData: User): User => {
  const newUser = { ...userData, id: generateUniqueId() };
  users.push(newUser)
  return newUser;
};

export const updateUser = (
  id: string,
  userData: Partial<User>
): User | undefined => {
  const foundUser = users.find((user) => user.id === id)
  if (foundUser) {
    Object.assign(foundUser, userData)
    return foundUser
  }
  return undefined
}

export const deleteUser = (id: string): boolean => {
  const index = users.findIndex((user) => user.id === id)
  if (index > -1) {
    users.splice(index, 1)
    return true
  }
  return false
}
