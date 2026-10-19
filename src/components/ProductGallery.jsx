import { useState } from 'react'
import ProductImage from './ProductImage'

export default function ProductGallery({ product }) {
  const [active, setActive] = useState(0)
  const labels = ['Front', 'Angle', 'Detail']

  return (
    <div className="gallery">
      <ProductImage image={product.gallery[active]} alt={`${product.name} - ${labels[active]} view`} className="gallery-main" />
      <div className="gallery-thumbs" role="group" aria-label="Product images">
        {product.gallery.map((image, index) => (
          <button
            key={labels[index]}
            type="button"
            className={`gallery-thumb ${index === active ? 'is-active' : ''}`}
            onClick={() => setActive(index)}
            aria-label={`Show ${labels[index]} view`}
            aria-pressed={index === active}
          >
            <ProductImage image={image} alt="" />
          </button>
        ))}
      </div>
    </div>
  )
}
