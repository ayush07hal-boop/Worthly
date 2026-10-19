import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Avatar from './Avatar'
import Modal from './Modal'
import Button from './Button'

export function GoogleLogo({ size = 18 }) {
  return (
    <svg className="google-icon-svg" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

export default function SocialButtons({ onSignedIn }) {
  const { loginWithGoogle, googleClientId } = useAuth()
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customEmail, setCustomEmail] = useState('')
  const gsiContainerRef = useRef(null)
  const [gsiReady, setGsiReady] = useState(false)

  const handleSuccess = (user) => {
    if (onSignedIn) {
      onSignedIn(user)
    } else {
      navigate('/')
    }
  }

  // Poll for Google Identity Services script availability
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.google?.accounts) {
      setGsiReady(true)
      return
    }

    const timer = setInterval(() => {
      if (window.google?.accounts) {
        setGsiReady(true)
        clearInterval(timer)
      }
    }, 150)

    const timeout = setTimeout(() => clearInterval(timer), 6000)
    return () => {
      clearInterval(timer)
      clearTimeout(timeout)
    }
  }, [])

  // Initialize GIS and render official button if container exists
  useEffect(() => {
    if (!gsiReady || !googleClientId || !window.google?.accounts?.id || !gsiContainerRef.current) return

    try {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: (response) => {
          if (response?.credential) {
            const user = loginWithGoogle(response.credential)
            if (user) handleSuccess(user)
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      })

      window.google.accounts.id.renderButton(gsiContainerRef.current, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        width: 380,
      })
    } catch (err) {
      console.warn('GSI renderButton notice:', err)
    }
  }, [gsiReady, googleClientId, loginWithGoogle])

  const handleGoogleClick = () => {
    // 1. Try Google OAuth 2.0 popup flow
    if (window.google?.accounts?.oauth2 && googleClientId) {
      try {
        setLoading(true)
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: 'email profile openid',
          callback: async (tokenResponse) => {
            setLoading(false)
            if (tokenResponse?.error) {
              console.warn('Google OAuth token error:', tokenResponse)
              setModalOpen(true)
              return
            }
            if (tokenResponse?.access_token) {
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                })
                const data = await res.json()
                const user = loginWithGoogle({
                  id: `google-${data.sub}`,
                  name: data.name,
                  email: data.email,
                  picture: data.picture,
                  username: (data.email ? data.email.split('@')[0] : data.name)
                    .toLowerCase()
                    .replace(/[^a-z0-9_]/g, '_'),
                })
                if (user) handleSuccess(user)
              } catch (e) {
                console.error('Failed fetching Google profile:', e)
                setModalOpen(true)
              }
            }
          },
          error_callback: (err) => {
            setLoading(false)
            console.warn('Google OAuth popup error or blocked:', err)
            setModalOpen(true)
          },
        })

        tokenClient.requestAccessToken({ prompt: 'select_account' })
        return
      } catch (err) {
        setLoading(false)
        console.warn('Google OAuth2 error, falling back to One-Tap/Modal:', err)
      }
    }

    // 2. Try Google One-Tap prompt if available
    if (window.google?.accounts?.id && googleClientId) {
      try {
        window.google.accounts.id.prompt()
        return
      } catch (e) {
        console.warn('Google Identity prompt notice:', e)
      }
    }

    // 3. Fallback to interactive Google account modal
    setModalOpen(true)
  }

  const selectAccount = (name, email) => {
    const user = loginWithGoogle({
      name,
      email,
      username: email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '_'),
    })
    setModalOpen(false)
    if (user) handleSuccess(user)
  }

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    if (!customEmail.trim()) return
    selectAccount(customName.trim() || 'Google User', customEmail.trim())
  }

  return (
    <>
      <div className="social-row">
        {/* Official Google GSI button if rendered */}
        <div ref={gsiContainerRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }} />

        {/* Branded Google button */}
        <button
          type="button"
          className="google-auth-btn"
          id="google-signin-btn"
          onClick={handleGoogleClick}
          disabled={loading}
          aria-label="Continue with Google"
        >
          <GoogleLogo size={20} />
          <span>{loading ? 'Connecting with Google...' : 'Continue with Google'}</span>
        </button>
      </div>

      <Modal open={modalOpen} title="Sign in with Google" onClose={() => setModalOpen(false)}>
        <div className="google-account-picker">
          <p className="muted" style={{ fontSize: 'var(--fs-sm)', marginBottom: '8px' }}>
            Choose an account to continue to <strong>Worthly</strong>
          </p>

          <button
            type="button"
            className="google-account-item"
            onClick={() => selectAccount('Ayush Kumar Kushwaha', 'ayush07hal@gmail.com')}
          >
            <Avatar name="Ayush Kumar Kushwaha" size={42} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>Ayush Kumar Kushwaha</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--muted)' }}>ayush07hal@gmail.com</div>
            </div>
          </button>

          <button
            type="button"
            className="google-account-item"
            onClick={() => selectAccount('Demo Google Reviewer', 'demo.reviewer@gmail.com')}
          >
            <Avatar name="Demo Google Reviewer" size={42} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>Demo Google Reviewer</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--muted)' }}>demo.reviewer@gmail.com</div>
            </div>
          </button>

          <p className="auth-divider"><span>or sign in with another Google email</span></p>

          <form onSubmit={handleCustomSubmit} className="stack">
            <div className="field">
              <label className="field-label" htmlFor="g-name">Your Name</label>
              <input
                id="g-name"
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Ayush Kumar"
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="g-email">Google Email</label>
              <input
                id="g-email"
                type="email"
                required
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="name@gmail.com"
              />
            </div>
            <Button type="submit" size="md" block>Sign in with Google</Button>
          </form>

          <div className="google-modal-note" style={{ background: 'var(--surface-light)', padding: '10px 12px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <p style={{ margin: '0 0 4px', fontWeight: 600, color: 'var(--text)' }}>
              ⚙️ Google Cloud Console Origin Setup:
            </p>
            <p style={{ margin: 0 }}>
              To enable live popup authentication for localhost, make sure <code>http://localhost:5173</code> is listed under <strong>Authorized JavaScript origins</strong> in your Google Cloud Console OAuth Client settings.
            </p>
          </div>
        </div>
      </Modal>
    </>
  )
}
