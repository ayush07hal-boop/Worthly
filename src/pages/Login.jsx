import { Link, useNavigate } from 'react-router-dom'
import SocialButtons from '../components/SocialButtons'
import Icon from '../components/Icon'

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="google-only-card">
      <div className="auth-card-header">
        <div className="auth-badge">
          <Icon name="shield" size={15} />
          <span>Secure Google Sign-In</span>
        </div>
        <h1>Welcome to Worthly</h1>
        <p className="muted">
          Sign in with Google to explore verified buyer reviews, build your wishlist, and make confident purchase decisions.
        </p>
      </div>

      <SocialButtons onSignedIn={() => navigate('/')} />

      <div className="auth-features-list">
        <div className="auth-feature-item">
          <span className="auth-feature-check">✓</span>
          <span>Instant one-click access — no passwords needed</span>
        </div>
        <div className="auth-feature-item">
          <span className="auth-feature-check">✓</span>
          <span>Sync your saved wishlist across all devices</span>
        </div>
        <div className="auth-feature-item">
          <span className="auth-feature-check">✓</span>
          <span>Write and vote on community product reviews</span>
        </div>
      </div>

      <p className="auth-disclaimer">
        By continuing with Google, you agree to Worthly’s{' '}
        <span className="text-link">Terms of Service</span> and{' '}
        <span className="text-link">Privacy Policy</span>.
      </p>

      <div className="auth-footer-link">
        <Link to="/" className="text-link">
          ← Return to browsing products
        </Link>
      </div>
    </div>
  )
}
