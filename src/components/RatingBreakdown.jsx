import { Stars } from './Rating'
import { ASPECTS, formatCount } from '../utils/format'

export function AspectBar({ label, value }) {
  return (
    <div className="aspect-row">
      <span className="aspect-label">{label}</span>
      <div className="aspect-track" role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={5} aria-valuenow={value}>
        <div className="aspect-fill" style={{ width: `${(value / 5) * 100}%` }} />
      </div>
      <span className="aspect-value">{value.toFixed(1)}</span>
    </div>
  )
}

export default function RatingBreakdown({ rating, reviewCount, aspectRatings }) {
  return (
    <section className="card breakdown" aria-labelledby="breakdown-title">
      <h2 id="breakdown-title" className="card-title">Rating breakdown</h2>
      <div className="breakdown-grid">
        <div className="breakdown-overall">
          <p className="breakdown-score"><strong>{rating.toFixed(1)}</strong> / 5</p>
          <Stars value={rating} size={18} />
          <p className="muted">Based on {formatCount(reviewCount)} reviews</p>
        </div>
        <div className="breakdown-bars">
          {ASPECTS.map(({ key, label }) => <AspectBar key={key} label={label} value={aspectRatings[key]} />)}
        </div>
      </div>
    </section>
  )
}
