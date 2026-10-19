import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import Icon from './Icon'
import { Stars } from './Rating'
import { AspectBar } from './RatingBreakdown'
import { ASPECTS, formatCount, formatPrice } from '../utils/format'

// Deliberately neutral: no "winner" highlighting. Helps people decide for themselves.
export default function ComparisonTable({ products, onRemove }) {
  return (
    <div className="compare-scroll" tabIndex={0} role="region" aria-label="Product comparison table">
      <table className="compare-table" style={{ '--cols': products.length }}>
        <thead>
          <tr>
            <th scope="col" className="compare-corner"><span className="sr-only">Feature</span></th>
            {products.map((product) => (
              <th scope="col" key={product.id}>
                <div className="compare-product">
                  <ProductImage image={product.image} alt={product.name} />
                  <p className="product-brand">{product.brand}</p>
                  <Link to={`/products/${product.id}`} className="compare-name">{product.name}</Link>
                  <button type="button" className="link-btn" onClick={() => onRemove(product.id)}>
                    <Icon name="close" size={13} /> Remove
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Price</th>
            {products.map((p) => <td key={p.id}><strong className="price">{formatPrice(p.price)}</strong></td>)}
          </tr>
          <tr>
            <th scope="row">Overall rating</th>
            {products.map((p) => (
              <td key={p.id}><div className="compare-rating"><Stars value={p.rating} size={14} /><strong>{p.rating.toFixed(1)}</strong></div></td>
            ))}
          </tr>
          <tr>
            <th scope="row">Reviews</th>
            {products.map((p) => <td key={p.id}>{formatCount(p.reviewCount)}</td>)}
          </tr>
          {ASPECTS.map(({ key, label }) => (
            <tr key={key}>
              <th scope="row">{label}</th>
              {products.map((p) => <td key={p.id}><AspectBar label={label} value={p.aspectRatings[key]} /></td>)}
            </tr>
          ))}
          <tr>
            <th scope="row">Community pros</th>
            {products.map((p) => (
              <td key={p.id}><ul className="compare-list pros">{p.pros.map((pro) => <li key={pro}>{pro}</li>)}</ul></td>
            ))}
          </tr>
          <tr>
            <th scope="row">Community cons</th>
            {products.map((p) => (
              <td key={p.id}><ul className="compare-list cons">{p.cons.map((con) => <li key={con}>{con}</li>)}</ul></td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
