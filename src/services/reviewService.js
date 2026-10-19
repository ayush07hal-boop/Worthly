import { products } from '../data/products'

export const REVIEW_SORT_OPTIONS = [
  { value: 'helpful', label: 'Most Helpful' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'highest', label: 'Highest Rated' },
  { value: 'lowest', label: 'Lowest Rated' },
]

export function getReviewsForUser(userId) {
  return products.flatMap((product) =>
    product.reviews.filter((review) => review.userId === userId).map((review) => ({ ...review, product })),
  )
}

export function getAllReviews() {
  return products.flatMap((product) => product.reviews.map((review) => ({ ...review, product })))
}

export function sortReviews(reviews, sortBy) {
  const sorters = {
    helpful: (a, b) => b.helpful - a.helpful,
    recent: (a, b) => new Date(b.date) - new Date(a.date),
    highest: (a, b) => b.rating - a.rating,
    lowest: (a, b) => a.rating - b.rating,
  }
  return [...reviews].sort(sorters[sortBy] ?? sorters.helpful)
}

export function getRatingDistribution(reviews) {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach((review) => {
    counts[review.rating] += 1
  })
  return counts
}
