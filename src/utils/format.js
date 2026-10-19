export function formatPrice(value) {
  return `₹${value.toLocaleString('en-IN')}`
}

export function formatCount(value) {
  return value.toLocaleString('en-IN')
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const ASPECTS = [
  { key: 'quality', label: 'Quality' },
  { key: 'performance', label: 'Performance' },
  { key: 'design', label: 'Design' },
  { key: 'durability', label: 'Durability' },
  { key: 'value', label: 'Value' },
]
