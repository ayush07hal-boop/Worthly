import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import SocialButtons from '../components/SocialButtons'
import { useToast } from '../context/ToastContext'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const { showToast } = useToast()
  const navigate = useNavigate()

  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value })

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!emailPattern.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password.length < 8) next.password = 'Use at least 8 characters.'
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match.'
    setErrors(next)
    if (Object.keys(next).length) return
    showToast('Account created (demo only, no real authentication yet)')
    navigate('/')
  }

  const fields = [
    ['name', 'Name', 'text', 'name', 'Your full name'],
    ['email', 'Email', 'email', 'email', 'you@example.com'],
    ['password', 'Password', 'password', 'new-password', 'At least 8 characters'],
    ['confirm', 'Confirm password', 'password', 'new-password', 'Repeat your password'],
  ]

  return (
    <div className="auth-card">
      <h1>Create your account</h1>
      <p className="muted">Join the community and help others buy better.</p>
      <SocialButtons />
      <p className="auth-divider"><span>or with email</span></p>

      <form className="stack" onSubmit={submit} noValidate>
        {fields.map(([key, label, type, autoComplete, placeholder]) => (
          <div className="field" key={key}>
            <label className="field-label" htmlFor={`reg-${key}`}>{label}</label>
            <input id={`reg-${key}`} type={type} autoComplete={autoComplete} value={form[key]} onChange={update(key)} placeholder={placeholder} aria-invalid={Boolean(errors[key])} />
            {errors[key] && <p className="field-error" role="alert">{errors[key]}</p>}
          </div>
        ))}
        <Button type="submit" size="lg" block>Create Account</Button>
      </form>

      <p className="auth-switch">Already have an account? <Link to="/login" className="text-link">Sign in</Link></p>
    </div>
  )
}
