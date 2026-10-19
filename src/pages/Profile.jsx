import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '../components/Avatar'
import Tabs from '../components/Tabs'
import ReviewCard from '../components/ReviewCard'
import EmptyState from '../components/EmptyState'
import NotFound from './NotFound'
import WishlistItem from '../components/WishlistItem'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { getUserById } from '../services/userService'
import { getReviewsForUser } from '../services/reviewService'
import { getProductsByIds } from '../services/productService'
import { currentUser } from '../data/users'

export default function Profile() {
  const { id } = useParams()
  const { user: authUser } = useAuth()
  const user = getUserById(id)
  const [tab, setTab] = useState('reviews')
  const { ids, toggleWishlist } = useWishlist()

  if (!user) return <NotFound />

  const isMe = user.id === (authUser?.id || currentUser.id)
  const reviews = getReviewsForUser(user.id)
  // Wishlists are private: only the signed-in (mock) user sees saved items.
  const wishlist = isMe ? getProductsByIds(ids) : []

  const stats = [
    ['Reviews written', reviews.length],
    ['Helpful votes', user.helpfulVotes],
    ['Wishlist', isMe ? wishlist.length : '-'],
  ]

  return (
    <div className="container profile">
      <header className="profile-head">
        <Avatar name={user.name || user.username} src={user.picture} size={84} />
        <div className="profile-id">
          <h1>{user.username}</h1>
          <p className="muted">{user.name} · Member since {user.memberSince}</p>
          <p>{user.bio}</p>
        </div>
        <dl className="profile-stats">
          {stats.map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </header>

      <Tabs label="Profile sections" value={tab} onChange={setTab} tabs={[{ value: 'reviews', label: 'Reviews', count: reviews.length }, { value: 'wishlist', label: 'Wishlist', count: isMe ? wishlist.length : undefined }]} />

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="tab-panel">
        {tab === 'reviews' && (reviews.length ? (
          <div className="review-list">{reviews.map((review) => <ReviewCard key={review.id} review={review} product={review.product} />)}</div>
        ) : <EmptyState icon="chat" title="No reviews yet." message="Reviews written by this member will appear here." />)}

        {tab === 'wishlist' && (
          isMe && wishlist.length ? (
            <div className="wish-grid">{wishlist.map((product) => <WishlistItem key={product.id} product={product} onRemove={toggleWishlist} />)}</div>
          ) : (
            <EmptyState icon="heart" title={isMe ? 'Your wishlist is empty.' : 'Wishlist is private.'} message={isMe ? 'Save products to see them here.' : 'Members only share their reviews publicly.'} actionLabel={isMe ? 'Discover Products →' : undefined} actionTo="/products" />
          )
        )}
      </div>
    </div>
  )
}
