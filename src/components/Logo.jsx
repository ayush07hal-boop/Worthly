import { Link } from 'react-router-dom'

export default function Logo({ onClick }) {
  return (
    <Link to="/" className="logo" aria-label="Worthly home" onClick={onClick}>
      Worthly<span>.</span>
    </Link>
  )
}
