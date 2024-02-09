import { User, users } from "../db";

export const getAllUsers = (): User[] => {
  return users || [];
};

export const getUserById = (id: number): User | undefined => {
  return users.find((user) => user.id === id);
};

export const createUser = (userData: User): User => {
  const newUser = { ...userData, id: generateUniqueId() };
  users.push(newUser);
  return newUser;
};

export const updateUser = (
  id: number,
  userData: Partial<User>,
): User | undefined => {
  const user = users.find((user) => user.id === id);
  if (user) {
    Object.assign(user, userData);
    return user;
  }
  return undefined;
};

export const deleteUser = (id: number): boolean => {
  const index = users.findIndex((user) => user.id === id);
  if (index > -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

const generateUniqueId = (): number => {
  return Math.floor(Math.random() * 1000);
};
