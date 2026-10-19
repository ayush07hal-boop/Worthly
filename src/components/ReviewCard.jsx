import { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import Icon from './Icon'
import Modal from './Modal'
import { Stars } from './Rating'
import Button from './Button'
import { getUserById } from '../services/userService'
import { useToast } from '../context/ToastContext'
import { ASPECTS, formatDate } from '../utils/format'

const REPORT_REASONS = ['Spam or promotion', 'Offensive language', 'Fake review', 'Off topic']
const LONG_TEXT = 200

// `product` is optional; pass it (profile page) to show which product was reviewed.
export default function ReviewCard({ review, product }) {
  const user = getUserById(review.userId)
  const { showToast } = useToast()
  const [vote, setVote] = useState(null) // 'up' | 'down' | null
  const [expanded, setExpanded] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')
  const [reportOpen, setReportOpen] = useState(false)
  const [reason, setReason] = useState(REPORT_REASONS[0])

  const isLong = review.body.length > LONG_TEXT
  const text = isLong && !expanded ? `${review.body.slice(0, LONG_TEXT).trim()}...` : review.body
  const helpfulCount = review.helpful + (vote === 'up' ? 1 : 0)

  const castVote = (next) => setVote((current) => (current === next ? null : next))

  const submitComment = (event) => {
    event.preventDefault()
    if (!comment.trim()) return
    setComment('')
    setShowComment(false)
    showToast('Comment posted')
  }

  const submitReport = (event) => {
    event.preventDefault()
    setReportOpen(false)
    showToast('Thanks, our moderators will take a look', 'info')
  }

  return (
    <article className="review-card">
      <header className="review-head">
        <Avatar name={user.username} size={42} />
        <div className="review-user">
          <Link to={`/profile/${user.id}`} className="review-username">{user.username}</Link>
          <span className="muted">{formatDate(review.date)}</span>
        </div>
        <span className={`badge ${review.status === 'owner' ? 'badge-accent' : ''}`}>
          {review.status === 'owner' ? 'Owner' : 'Used'}
        </span>
      </header>

      {product && (
        <Link to={`/products/${product.id}`} className="review-product">
          Reviewed <strong>{product.name}</strong> <Icon name="chevronRight" size={14} />
        </Link>
      )}

      <div className="review-rating">
        <Stars value={review.rating} size={15} />
        <h3>{review.title}</h3>
      </div>
      <p className="review-body">
        {text}
        {isLong && (
          <button type="button" className="link-btn" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>

      <ul className="review-aspects" aria-label="Aspect ratings">
        {ASPECTS.map(({ key, label }) => (
          <li key={key}><span>{label}</span><strong>{review.aspects[key]}</strong></li>
        ))}
      </ul>

      <footer className="review-actions">
        <button type="button" className={`action-btn ${vote === 'up' ? 'is-on' : ''}`} onClick={() => castVote('up')} aria-pressed={vote === 'up'}>
          <Icon name="thumbUp" size={15} /> Helpful ({helpfulCount})
        </button>
        <button type="button" className={`action-btn ${vote === 'down' ? 'is-on' : ''}`} onClick={() => castVote('down')} aria-pressed={vote === 'down'}>
          <Icon name="thumbDown" size={15} /> Not Helpful
        </button>
        <button type="button" className="action-btn" onClick={() => setShowComment(!showComment)} aria-expanded={showComment}>
          <Icon name="comment" size={15} /> Comment ({review.comments})
        </button>
        <button type="button" className="action-btn action-report" onClick={() => setReportOpen(true)}>
          <Icon name="flag" size={15} /> Report
        </button>
      </footer>

      {showComment && (
        <form className="comment-form" onSubmit={submitComment}>
          <label htmlFor={`comment-${review.id}`} className="sr-only">Write a comment</label>
          <input id={`comment-${review.id}`} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." />
          <Button type="submit" size="sm" disabled={!comment.trim()}>Post</Button>
        </form>
      )}

      <Modal open={reportOpen} title="Report this review" onClose={() => setReportOpen(false)}>
        <form onSubmit={submitReport} className="stack">
          <fieldset className="radio-group">
            <legend>Why are you reporting this review?</legend>
            {REPORT_REASONS.map((option) => (
              <label key={option} className="radio">
                <input type="radio" name={`reason-${review.id}`} checked={reason === option} onChange={() => setReason(option)} />
                {option}
              </label>
            ))}
          </fieldset>
          <div className="modal-actions">
            <Button variant="ghost" onClick={() => setReportOpen(false)}>Cancel</Button>
            <Button type="submit">Submit report</Button>
          </div>
        </form>
      </Modal>
    </article>
  )
}
