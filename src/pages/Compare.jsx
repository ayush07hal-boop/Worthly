import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import ComparisonTable from '../components/ComparisonTable'
import ProductImage from '../components/ProductImage'
import Modal from '../components/Modal'
import Button from '../components/Button'
import Icon from '../components/Icon'
import EmptyState from '../components/EmptyState'
import { MAX_COMPARE, useCompare } from '../context/CompareContext'
import { getProductsByIds, getProducts } from '../services/productService'
import { formatPrice } from '../utils/format'

export default function Compare() {
  const { ids, toggleCompare, removeFromCompare } = useCompare()
  const [picker, setPicker] = useState(false)
  const selected = getProductsByIds(ids)

  return (
    <>
      <PageHeader title="Compare products" subtitle={`Pick 2 to ${MAX_COMPARE} products and see how the community rates them side by side.`}>
        <Button onClick={() => setPicker(true)} disabled={ids.length >= MAX_COMPARE}>
          <Icon name="plus" size={17} /> Add product ({ids.length}/{MAX_COMPARE})
        </Button>
      </PageHeader>

      <div className="container section-tight">
        {selected.length === 0 && (
          <EmptyState icon="compare" title="Nothing to compare yet." message="Add at least two products to see them side by side." />
        )}
        {selected.length === 1 && <p className="notice">Add one more product to start comparing.</p>}
        {selected.length >= 2 && <ComparisonTable products={selected} onRemove={removeFromCompare} />}
        {selected.length === 0 && <div className="center-row"><Button variant="secondary" onClick={() => setPicker(true)}>Choose products</Button></div>}
      </div>

      <Modal open={picker} title="Choose products to compare" onClose={() => setPicker(false)}>
        <ul className="picker-list">
          {getProducts().map((product) => {
            const active = ids.includes(product.id)
            return (
              <li key={product.id}>
                <button type="button" className={`picker-item ${active ? 'is-active' : ''}`} onClick={() => toggleCompare(product)} aria-pressed={active}>
                  <ProductImage image={product.image} alt="" />
                  <span className="picker-text"><strong>{product.name}</strong><span className="muted">{product.brand} · {formatPrice(product.price)}</span></span>
                  <span className="picker-check">{active && <Icon name="check" size={16} />}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <div className="modal-actions"><Button onClick={() => setPicker(false)}>Done</Button></div>
      </Modal>
    </>
  )
}
