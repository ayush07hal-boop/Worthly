import { Link, useNavigate } from 'react-router-dom'
import SocialButtons from '../components/SocialButtons'
import Icon from '../components/Icon'

export default function Register() {
  const navigate = useNavigate()

  return (
    <div className="google-only-card">
      <div className="auth-card-header">
        <div className="auth-badge">
          <Icon name="sparkle" size={15} />
          <span>Join the Community</span>
        </div>
        <h1>Create your Worthly account</h1>
        <p className="muted">
          Join thousands of smart shoppers using AI summaries and honest community reviews to buy better.
        </p>
      </div>

      <SocialButtons onSignedIn={() => navigate('/')} />

      <div className="auth-features-list">
        <div className="auth-feature-item">
          <span className="auth-feature-check">✓</span>
          <span>Fast setup with your verified Google account</span>
        </div>
        <div className="auth-feature-item">
          <span className="auth-feature-check">✓</span>
          <span>Personalized product recommendations</span>
        </div>
        <div className="auth-feature-item">
          <span className="auth-feature-check">✓</span>
          <span>Track prices and compare features side-by-side</span>
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
