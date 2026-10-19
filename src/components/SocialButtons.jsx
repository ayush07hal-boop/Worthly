import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Avatar from './Avatar'
import Modal from './Modal'

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
  const gsiContainerRef = useRef(null)
  const [gsiLoaded, setGsiLoaded] = useState(false)

  const handleSuccess = (user) => {
    if (onSignedIn) {
      onSignedIn(user)
    } else {
      navigate('/')
    }
  }

  // Initialize official Google Identity Services button
  useEffect(() => {
    if (!googleClientId) return

    let cancelled = false

    const renderOfficialButton = () => {
      if (cancelled) return
      if (!window.google?.accounts?.id || !gsiContainerRef.current) return

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

        if (gsiContainerRef.current) {
          gsiContainerRef.current.innerHTML = ''
          window.google.accounts.id.renderButton(gsiContainerRef.current, {
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular',
            width: 380,
            logo_alignment: 'left',
          })
          setGsiLoaded(true)
        }
      } catch (err) {
        console.warn('Google GSI renderButton:', err)
      }
    }

    if (window.google?.accounts?.id) {
      renderOfficialButton()
    } else {
      const timer = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(timer)
          renderOfficialButton()
        }
      }, 100)
      const timeout = setTimeout(() => clearInterval(timer), 5000)
      return () => {
        cancelled = true
        clearInterval(timer)
        clearTimeout(timeout)
      }
    }

    return () => {
      cancelled = true
    }
  }, [googleClientId, loginWithGoogle])

  // Single account sign in
  const selectFirstAccount = () => {
    const user = loginWithGoogle({
      name: 'Ayush Kumar Kushwaha',
      email: 'ayush07hal@gmail.com',
      username: 'ayush07hal',
    })
    setModalOpen(false)
    if (user) handleSuccess(user)
  }

  return (
    <>
      <div className="social-row">
        {/* Only the single Google button container */}
        <div
          ref={gsiContainerRef}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        />

        {/* Fallback button only before Google GSI finishes loading */}
        {!gsiLoaded && (
          <button
            type="button"
            className="google-auth-btn"
            id="google-signin-btn"
            onClick={selectFirstAccount}
            aria-label="Continue with Google"
          >
            <GoogleLogo size={20} />
            <span>Continue with Google</span>
          </button>
        )}
      </div>

      <Modal open={modalOpen} title="Sign in with Google" onClose={() => setModalOpen(false)}>
        <div className="google-account-picker">
          <p className="muted" style={{ fontSize: 'var(--fs-sm)', marginBottom: '8px' }}>
            Continue to <strong>Worthly</strong> with your account:
          </p>

          {/* Only the first account option kept */}
          <button
            type="button"
            className="google-account-item"
            onClick={selectFirstAccount}
          >
            <Avatar name="Ayush Kumar Kushwaha" size={42} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>Ayush Kumar Kushwaha</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--muted)' }}>ayush07hal@gmail.com</div>
            </div>
          </button>
        </div>
      </Modal>
    </>
  )
}
