import { users } from '../data/users'

export function getUserById(id) {
  return users.find((user) => user.id === id) ?? null
}

export function getUserByUsername(username) {
  return users.find((user) => user.username === username) ?? null
}
