import Icon from './Icon'
import Button from './Button'
import { useWishlist } from '../context/WishlistContext'

// variant "icon" = round heart on cards, "full" = labelled button on the detail page.
export default function WishlistButton({ product, variant = 'icon' }) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const active = isWishlisted(product.id)

  if (variant === 'full') {
    return (
      <Button variant="secondary" onClick={() => toggleWishlist(product)} aria-pressed={active}>
        <Icon name="heart" size={17} filled={active} />
        {active ? 'In Wishlist' : 'Add to Wishlist'}
      </Button>
    )
  }

  return (
    <button
      type="button"
      className={`wishlist-btn ${active ? 'is-active' : ''}`}
      onClick={() => toggleWishlist(product)}
      aria-pressed={active}
      aria-label={active ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
    >
      <Icon name="heart" size={17} filled={active} />
    </button>
  )
}
