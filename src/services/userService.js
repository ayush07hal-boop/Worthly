import { users } from '../data/users'

function getStoredUsers() {
  try {
    const raw = localStorage.getItem('worthly:custom_users')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveCustomUser(user) {
  try {
    const existing = getStoredUsers()
    const index = existing.findIndex((u) => u.id === user.id)
    if (index >= 0) {
      existing[index] = { ...existing[index], ...user }
    } else {
      existing.push(user)
    }
    localStorage.setItem('worthly:custom_users', JSON.stringify(existing))
  } catch {
    /* storage unavailable, ignore */
  }
}

export function getUserById(id) {
  const custom = getStoredUsers().find((user) => user.id === id)
  if (custom) return custom
  return users.find((user) => user.id === id) ?? null
}

export function getUserByUsername(username) {
  const custom = getStoredUsers().find((user) => user.username === username)
  if (custom) return custom
  return users.find((user) => user.username === username) ?? null
}
