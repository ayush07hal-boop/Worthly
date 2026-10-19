import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import Rating from './Rating'
import Button from './Button'
import Icon from './Icon'
import { formatPrice } from '../utils/format'

export default function WishlistItem({ product, onRemove }) {
  const best = product.stores.reduce((min, store) => (store.price < min.price ? store : min))
  return (
    <article className="wish-card">
      <Link to={`/products/${product.id}`} tabIndex={-1} aria-hidden="true" className="wish-media">
        <ProductImage image={product.image} alt="" />
      </Link>
      <div className="wish-body">
        <p className="product-brand">{product.brand}</p>
        <h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
        <Rating value={product.rating} count={product.reviewCount} size={14} />
        <p className="wish-store">Best price at <strong>{best.name}</strong>: <span className="price">{formatPrice(best.price)}</span></p>
        <div className="wish-actions">
          <Button to={`/products/${product.id}`} size="sm">View Product</Button>
          {onRemove && (
            <Button variant="ghost" size="sm" onClick={() => onRemove(product)}><Icon name="trash" size={15} /> Remove</Button>
          )}
        </div>
      </div>
    </article>
  )
}
