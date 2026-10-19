import Icon from './Icon'
import { formatCount } from '../utils/format'

// Read-only star rating. `size` in px. Partial stars are rendered with a clipped overlay.
export function Stars({ value, size = 16 }) {
  const percent = Math.max(0, Math.min(5, value)) * 20
  return (
    <span className="stars" style={{ '--star-size': `${size}px` }} role="img" aria-label={`${value} out of 5 stars`}>
      <span className="stars-base">
        {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={size} filled strokeWidth={1} />)}
      </span>
      <span className="stars-fill" style={{ width: `${percent}%` }}>
        {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={size} filled strokeWidth={1} />)}
      </span>
    </span>
  )
}

export default function Rating({ value, count, size = 15, showStars = true, compact = false }) {
  return (
    <div className={`rating ${compact ? 'rating-compact' : ''}`}>
      {showStars ? <Stars value={value} size={size} /> : <Icon name="star" size={size} filled strokeWidth={1} className="rating-star" />}
      <strong>{value.toFixed(1)}</strong>
      {count !== undefined && <span className="rating-count">{formatCount(count)} reviews</span>}
    </div>
  )
}

// Interactive star input for forms.
export function StarInput({ label, value, onChange, size = 24 }) {
  return (
    <div className="star-input" role="radiogroup" aria-label={label}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className={`star-input-btn ${n <= value ? 'is-on' : ''}`}
          onClick={() => onChange(n)}
        >
          <Icon name="star" size={size} filled={n <= value} strokeWidth={1.6} />
        </button>
      ))}
    </div>
  )
}
