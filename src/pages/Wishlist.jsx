import PageHeader from '../components/PageHeader'
import WishlistItem from '../components/WishlistItem'
import EmptyState from '../components/EmptyState'
import { useWishlist } from '../context/WishlistContext'
import { getProductsByIds } from '../services/productService'

export default function Wishlist() {
  const { ids, toggleWishlist } = useWishlist()
  const items = getProductsByIds(ids)

  return (
    <>
      <PageHeader title="My Wishlist" subtitle={items.length ? `${items.length} saved ${items.length === 1 ? 'product' : 'products'}` : undefined} />
      <div className="container section-tight">
        {items.length === 0 ? (
          <EmptyState icon="heart" title="Your wishlist is empty." message="Save products you are considering and come back to them anytime." actionLabel="Discover Products →" actionTo="/products" />
        ) : (
          <div className="wish-grid">
            {items.map((product) => <WishlistItem key={product.id} product={product} onRemove={toggleWishlist} />)}
          </div>
        )}
      </div>
    </>
  )
}
