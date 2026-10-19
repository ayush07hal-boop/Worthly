import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import SocialButtons from '../components/SocialButtons'
import { useToast } from '../context/ToastContext'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '', remember: true })
  const [errors, setErrors] = useState({})
  const { showToast } = useToast()
  const navigate = useNavigate()

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (!emailPattern.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password.length < 6) next.password = 'Password must be at least 6 characters.'
    setErrors(next)
    if (Object.keys(next).length) return
    showToast('Signed in (demo only, no real authentication yet)')
    navigate('/')
  }

  return (
    <div className="auth-card">
      <h1>Welcome back</h1>
      <p className="muted">Sign in to save products and write reviews.</p>
      <SocialButtons />
      <p className="auth-divider"><span>or with email</span></p>

      <form className="stack" onSubmit={submit} noValidate>
        <div className="field">
          <label className="field-label" htmlFor="login-email">Email</label>
          <input id="login-email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} />
          {errors.email && <p className="field-error" role="alert">{errors.email}</p>}
        </div>
        <div className="field">
          <label className="field-label" htmlFor="login-password">Password</label>
          <input id="login-password" type="password" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Your password" aria-invalid={Boolean(errors.password)} />
          {errors.password && <p className="field-error" role="alert">{errors.password}</p>}
        </div>
        <div className="auth-row">
          <label className="check"><input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} /> Remember me</label>
          <button type="button" className="link-btn" onClick={() => showToast('Password reset is not available in the demo', 'info')}>Forgot password?</button>
        </div>
        <Button type="submit" size="lg" block>Sign In</Button>
      </form>

      <p className="auth-switch">New to Worthly? <Link to="/register" className="text-link">Create an account</Link></p>
    </div>
  )
}
