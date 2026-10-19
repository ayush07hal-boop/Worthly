import { useEffect, useState } from 'react'

// useState that persists to localStorage, so the wishlist survives a refresh.
export default function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage unavailable, ignore */
    }
  }, [key, value])

  return [value, setValue]
}
