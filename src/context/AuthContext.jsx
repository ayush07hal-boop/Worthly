import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { saveCustomUser, getUserById } from '../services/userService'
import { useToast } from './ToastContext'

const AuthContext = createContext(null)

const AUTH_STORAGE_KEY = 'worthly:auth_user'

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    )
    return JSON.parse(jsonPayload)
  } catch (err) {
    console.error('Failed to parse Google JWT credential:', err)
    return null
  }
}

export function AuthProvider({ children }) {
  const { showToast } = useToast()
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const googleClientId =
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    '888780566294-1avifbpb8imbaqqil6r0oibrprthqrfj.apps.googleusercontent.com'

  // Sync user state changes to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
        saveCustomUser(user)
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    } catch {
      /* ignore */
    }
  }, [user])

  const loginWithGoogle = useCallback(
    (credentialOrUser) => {
      let profile = null

      if (typeof credentialOrUser === 'string') {
        // It's a Google JWT token from Google Identity Services
        const decoded = parseJwt(credentialOrUser)
        if (decoded) {
          profile = {
            id: `google-${decoded.sub}`,
            username: (decoded.email ? decoded.email.split('@')[0] : decoded.name).toLowerCase().replace(/[^a-z0-9_]/g, '_'),
            name: decoded.name || 'Google User',
            email: decoded.email || '',
            picture: decoded.picture || null,
            provider: 'google',
            memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            helpfulVotes: 0,
            bio: 'Active Worthly reviewer · Verified Google Account',
          }
        }
      } else if (credentialOrUser && typeof credentialOrUser === 'object') {
        profile = {
          id: credentialOrUser.id || `google-${Date.now()}`,
          username: credentialOrUser.username || (credentialOrUser.email ? credentialOrUser.email.split('@')[0] : 'google_user'),
          name: credentialOrUser.name || 'Google User',
          email: credentialOrUser.email || '',
          picture: credentialOrUser.picture || null,
          provider: 'google',
          memberSince: credentialOrUser.memberSince || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          helpfulVotes: credentialOrUser.helpfulVotes || 0,
          bio: credentialOrUser.bio || 'Verified Google Account',
        }
      } else {
        // Default Google authentication simulation
        profile = {
          id: 'google-user-ayush',
          username: 'ayush_kushwaha',
          name: 'Ayush Kumar Kushwaha',
          email: 'ayush07hal@gmail.com',
          picture: null,
          provider: 'google',
          memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          helpfulVotes: 12,
          bio: 'Tech enthusiast & smart shopping advocate · Verified Google Account',
        }
      }

      if (profile) {
        saveCustomUser(profile)
        setUser(profile)
        showToast(`Signed in with Google as ${profile.name}`, 'success')
        return profile
      }
      return null
    },
    [showToast],
  )

  const loginWithEmail = useCallback(
    (email, password) => {
      const cleanEmail = email.trim().toLowerCase()
      const username = cleanEmail.split('@')[0].replace(/[^a-z0-9_]/g, '_')
      const profile = {
        id: `user-${username}`,
        username,
        name: username.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email: cleanEmail,
        provider: 'email',
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        helpfulVotes: 0,
        bio: 'Community member on Worthly',
      }
      saveCustomUser(profile)
      setUser(profile)
      showToast(`Welcome back, ${profile.name}!`, 'success')
      return profile
    },
    [showToast],
  )

  const register = useCallback(
    ({ name, email }) => {
      const cleanEmail = email.trim().toLowerCase()
      const username = cleanEmail.split('@')[0].replace(/[^a-z0-9_]/g, '_')
      const profile = {
        id: `user-${Date.now()}`,
        username,
        name: name.trim(),
        email: cleanEmail,
        provider: 'email',
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        helpfulVotes: 0,
        bio: 'New member exploring trusted product reviews.',
      }
      saveCustomUser(profile)
      setUser(profile)
      showToast(`Account created! Welcome, ${profile.name}!`, 'success')
      return profile
    },
    [showToast],
  )

  const logout = useCallback(() => {
    if (window.google?.accounts?.id?.disableAutoSelect) {
      try {
        window.google.accounts.id.disableAutoSelect()
      } catch {
        /* ignore */
      }
    }
    setUser(null)
    showToast('You have been signed out.', 'info')
  }, [showToast])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      googleClientId,
      loginWithGoogle,
      loginWithEmail,
      register,
      logout,
    }),
    [user, googleClientId, loginWithGoogle, loginWithEmail, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
