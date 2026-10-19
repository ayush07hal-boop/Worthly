import Icon from './Icon'
import { formatPrice } from '../utils/format'
import { useToast } from '../context/ToastContext'

export default function StoreCard({ store, isBest, productName }) {
  const { showToast } = useToast()
  return (
    <div className="store-card">
      <span className="store-logo" aria-hidden="true">{store.name[0]}</span>
      <div className="store-info">
        <strong>{store.name}</strong>
        {isBest && <span className="badge badge-accent">Lowest price</span>}
      </div>
      <span className="store-price">{formatPrice(store.price)}</span>
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={() => showToast(`Affiliate link for ${productName} on ${store.name} coming soon`, 'info')}
      >
        View Deal <Icon name="external" size={14} />
      </button>
    </div>
  )
}
