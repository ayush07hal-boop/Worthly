import { useState } from 'react'
import Icon from './Icon'
import Button from './Button'
import { formatPrice } from '../utils/format'

export const PRICE_MAX = 150000
export const defaultFilters = { categories: [], brands: [], maxPrice: PRICE_MAX, minRating: 0 }

function toggleItem(list, item) {
  return list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item]
}

export default function FilterSidebar({ filters, onChange, categories, brands, hideCategory = false }) {
  const [open, setOpen] = useState(false)
  const activeCount =
    filters.categories.length + filters.brands.length + (filters.maxPrice < PRICE_MAX ? 1 : 0) + (filters.minRating > 0 ? 1 : 0)

  return (
    <aside className="filters" aria-label="Filters">
      <button type="button" className="filters-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="filters-panel">
        <Icon name="filter" size={17} /> Filters {activeCount > 0 && <span className="badge badge-accent">{activeCount}</span>}
        <Icon name="chevronDown" size={16} className={open ? 'flip' : ''} />
      </button>

      <div id="filters-panel" className={`filters-panel ${open ? 'is-open' : ''}`}>
        <div className="filters-head">
          <h2>Filters</h2>
          {activeCount > 0 && <button type="button" className="link-btn" onClick={() => onChange(defaultFilters)}>Clear all</button>}
        </div>

        {!hideCategory && (
          <fieldset className="filter-group">
            <legend>Category</legend>
            {categories.map((category) => (
              <label key={category.id} className="check">
                <input type="checkbox" checked={filters.categories.includes(category.id)} onChange={() => onChange({ ...filters, categories: toggleItem(filters.categories, category.id) })} />
                {category.name}
              </label>
            ))}
          </fieldset>
        )}

        <fieldset className="filter-group">
          <legend>Brand</legend>
          {brands.map((brand) => (
            <label key={brand} className="check">
              <input type="checkbox" checked={filters.brands.includes(brand)} onChange={() => onChange({ ...filters, brands: toggleItem(filters.brands, brand) })} />
              {brand}
            </label>
          ))}
        </fieldset>

        <div className="filter-group">
          <label htmlFor="price-range" className="filter-legend">Max price: <strong>{formatPrice(filters.maxPrice)}</strong></label>
          <input id="price-range" type="range" min={500} max={PRICE_MAX} step={500} value={filters.maxPrice} onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })} />
        </div>

        <fieldset className="filter-group">
          <legend>Rating</legend>
          {[4.5, 4, 3].map((min) => (
            <label key={min} className="check">
              <input type="radio" name="min-rating" checked={filters.minRating === min} onChange={() => onChange({ ...filters, minRating: min })} />
              {min}+ stars
            </label>
          ))}
          <label className="check">
            <input type="radio" name="min-rating" checked={filters.minRating === 0} onChange={() => onChange({ ...filters, minRating: 0 })} />
            Any rating
          </label>
        </fieldset>

        <Button variant="ghost" size="sm" block onClick={() => onChange(defaultFilters)}>Reset filters</Button>
      </div>
    </aside>
  )
}
