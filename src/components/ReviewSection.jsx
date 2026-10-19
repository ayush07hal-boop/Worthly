import { useMemo, useState } from 'react'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'
import SortDropdown from './SortDropdown'
import { Stars } from './Rating'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { currentUser } from '../data/users'
import { getRatingDistribution, REVIEW_SORT_OPTIONS, sortReviews } from '../services/reviewService'

// Community reviews list + summary + write form. New reviews live in local state only.
export default function ReviewSection({ product }) {
  const [sortBy, setSortBy] = useState('helpful')
  const [added, setAdded] = useState([])
  const { showToast } = useToast()
  const { user } = useAuth()

  const all = useMemo(() => [...added, ...product.reviews], [added, product.reviews])
  const sorted = useMemo(() => sortReviews(all, sortBy), [all, sortBy])
  const distribution = getRatingDistribution(all)

  const submitReview = (data) => {
    const activeUserId = user?.id || currentUser.id
    const review = {
      id: `${product.id}-new-${Date.now()}`,
      productId: product.id,
      userId: activeUserId,
      date: new Date().toISOString().slice(0, 10),
      helpful: 0,
      comments: 0,
      ...data,
      aspects: Object.fromEntries(Object.entries(data.aspects).map(([key, value]) => [key, value || data.rating])),
    }
    setAdded((list) => [review, ...list])
    setSortBy('recent')
    showToast('Review submitted. Thank you!')
  }

  return (
    <>
      <section className="reviews" id="reviews" aria-labelledby="reviews-title">
        <div className="reviews-head">
          <h2 id="reviews-title">Community reviews</h2>
          <SortDropdown id="review-sort" label="Sort reviews" value={sortBy} onChange={setSortBy} options={REVIEW_SORT_OPTIONS} />
        </div>

        <div className="card review-summary">
          <div className="review-summary-score">
            <strong>{product.rating.toFixed(1)}</strong>
            <Stars value={product.rating} size={16} />
            <span className="muted">{all.length} reviews shown</span>
          </div>
          <div className="distribution">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="distribution-row">
                <span>{star} star</span>
                <div className="aspect-track"><div className="aspect-fill" style={{ width: `${all.length ? (distribution[star] / all.length) * 100 : 0}%` }} /></div>
                <span className="muted">{distribution[star]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="review-list">
          {sorted.map((review) => <ReviewCard key={review.id} review={review} />)}
        </div>
      </section>

      <div id="write-review">
        <ReviewForm productName={product.name} onSubmit={submitReview} />
      </div>
    </>
  )
}
