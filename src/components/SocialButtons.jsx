import { useToast } from '../context/ToastContext'

// Visual only. Wire these to OAuth once the backend exists.
export default function SocialButtons() {
  const { showToast } = useToast()
  const providers = ['Google', 'GitHub']
  return (
    <div className="social-row">
      {providers.map((name) => (
        <button key={name} type="button" className="btn btn-secondary btn-md" onClick={() => showToast(`${name} sign-in is not connected yet`, 'info')}>
          <span className="social-mark" aria-hidden="true">{name[0]}</span> Continue with {name}
        </button>
      ))}
    </div>
  )
}
