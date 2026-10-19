import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductGallery from '../components/ProductGallery'
import Rating from '../components/Rating'
import RatingBreakdown from '../components/RatingBreakdown'
import WishlistButton from '../components/WishlistButton'
import StoreCard from '../components/StoreCard'
import AISummary from '../components/AISummary'
import AIQuestionBox from '../components/AIQuestionBox'
import ReviewSection from '../components/ReviewSection'
import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import Icon from '../components/Icon'
import EmptyState from '../components/EmptyState'
import { useCompare } from '../context/CompareContext'
import { getCategoryById, getProductById, getProducts } from '../services/productService'
import { formatPrice } from '../utils/format'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const navigate = useNavigate()
  const { isComparing, toggleCompare } = useCompare()

  if (!product) {
    return (
      <div className="container section">
        <EmptyState title="Product not found." message="It may have been removed or the link is incorrect." actionLabel="Discover Products →" actionTo="/products" />
      </div>
    )
  }

  const category = getCategoryById(product.category)
  const bestPrice = Math.min(...product.stores.map((store) => store.price))
  const related = getProducts().filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const comparing = isComparing(product.id)

  const handleCompare = () => {
    if (!comparing) toggleCompare(product)
    navigate('/compare')
  }

  return (
    <div className="container detail">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/products">Products</Link>
        <Icon name="chevronRight" size={13} />
        <Link to={`/categories/${product.category}`}>{category?.name}</Link>
        <Icon name="chevronRight" size={13} />
        <span aria-current="page">{product.name}</span>
      </nav>

      <section className="detail-top" aria-label="Product overview">
        <ProductGallery product={product} />
        <div className="detail-info">
          <p className="product-brand">{product.brand}</p>
          <h1>{product.name}</h1>
          <div className="detail-rating"><Rating value={product.rating} count={product.reviewCount} size={18} /></div>
          <p className="detail-desc">{product.description}</p>
          <p className="detail-price">{formatPrice(product.price)} <span className="muted">Best price {formatPrice(bestPrice)}</span></p>

          <div className="detail-actions">
            <WishlistButton product={product} variant="full" />
            <Button variant="secondary" onClick={handleCompare}><Icon name="compare" size={17} /> {comparing ? 'View comparison' : 'Compare'}</Button>
          </div>

          <div className="where-to-buy">
            <h2>Where to buy</h2>
            {product.stores.map((store) => (
              <StoreCard key={store.name} store={store} isBest={store.price === bestPrice} productName={product.name} />
            ))}
          </div>
        </div>
      </section>

      <div className="detail-grid">
        <div className="detail-col">
          <RatingBreakdown rating={product.rating} reviewCount={product.reviewCount} aspectRatings={product.aspectRatings} />
          <AISummary product={product} />
        </div>
        <AIQuestionBox product={product} />
      </div>

      <ReviewSection product={product} />

      {related.length > 0 && (
        <section className="section-tight" aria-labelledby="related-title">
          <SectionHeading label="Keep exploring" title="Similar products" id="related-title" linkText="See category →" linkTo={`/categories/${product.category}`} />
          <div className="product-grid">
            {related.map((item) => <ProductCard key={item.id} product={item} variant="compact" />)}
          </div>
        </section>
      )}
    </div>
  )
}
