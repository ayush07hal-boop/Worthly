import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import Rating from './Rating'
import WishlistButton from './WishlistButton'
import Button from './Button'
import { getCategoryById } from '../services/productService'
import { formatPrice } from '../utils/format'

// variant "compact" (home) shows category; "detailed" (listing) shows brand + community insight + wishlist.
export default function ProductCard({ product, variant = 'detailed' }) {
  const detailed = variant === 'detailed'
  const category = getCategoryById(product.category)

  return (
    <article className="product-card">
      <div className="product-card-media">
        <Link to={`/products/${product.id}`} aria-label={`View ${product.name}`} tabIndex={-1}>
          <ProductImage image={product.image} alt={`${product.name} product image`} />
        </Link>
        <span className="product-tag">{category?.name}</span>
        {detailed && <WishlistButton product={product} />}
      </div>
      <div className="product-card-body">
        <p className="product-brand">{detailed ? product.brand : product.subcategory}</p>
        <h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
        <Rating value={product.rating} count={product.reviewCount} size={14} />
        {detailed && <p className="product-insight">{product.insight}</p>}
        <div className="product-card-footer">
          <strong className="price">{formatPrice(product.price)}</strong>
          <Button to={`/products/${product.id}`} variant="secondary" size="sm">
            {detailed ? 'View Product' : 'View'}
          </Button>
        </div>
      </div>
    </article>
  )
}
