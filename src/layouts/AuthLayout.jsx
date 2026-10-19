import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import Icon from '../components/Icon'

const points = [
  ['users', 'Honest reviews from people who actually own the product'],
  ['sparkle', 'AI summaries so you skip hundreds of reviews'],
  ['compare', 'Side-by-side comparisons to decide on your terms'],
]

export default function AuthLayout() {
  return (
    <div className="auth-shell">
      <aside className="auth-aside">
        <Logo />
        <div className="auth-pitch">
          <h1>Know before <span className="text-accent">you buy.</span></h1>
          <ul>
            {points.map(([icon, text]) => (
              <li key={text}><span className="feature-icon"><Icon name={icon} size={18} /></span>{text}</li>
            ))}
          </ul>
        </div>
        <p className="muted">© 2026 Worthly</p>
      </aside>
      <main className="auth-main">
        <div className="auth-mobile-logo"><Logo /></div>
        <Outlet />
      </main>
    </div>
  )
}
