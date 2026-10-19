import { useMemo, useState } from 'react'
import FilterSidebar, { defaultFilters } from './FilterSidebar'
import SortDropdown from './SortDropdown'
import ProductCard from './ProductCard'
import EmptyState from './EmptyState'
import Button from './Button'
import { filterProducts, getBrands, getCategories, SORT_OPTIONS, sortProducts } from '../services/productService'

const PAGE_SIZE = 6

// Shared "filters + sort + grid + load more" block used by Discover, Search and Trending.
export default function ProductExplorer({ products, defaultSort = 'relevant', hideCategory = false, empty }) {
  const [filters, setFilters] = useState(defaultFilters)
  const [sortBy, setSortBy] = useState(defaultSort)
  const [visible, setVisible] = useState(PAGE_SIZE)

  const results = useMemo(() => sortProducts(filterProducts(products, filters), sortBy), [products, filters, sortBy])
  const brands = useMemo(() => getBrands().filter((brand) => products.some((p) => p.brand === brand)), [products])

  const changeFilters = (next) => {
    setFilters(next)
    setVisible(PAGE_SIZE)
  }

  return (
    <div className="explorer">
      <FilterSidebar filters={filters} onChange={changeFilters} categories={getCategories()} brands={brands} hideCategory={hideCategory} />

      <div className="explorer-main">
        <div className="explorer-toolbar">
          <p className="result-count" aria-live="polite">
            <strong>{results.length}</strong> {results.length === 1 ? 'product' : 'products'}
          </p>
          <SortDropdown value={sortBy} onChange={setSortBy} options={SORT_OPTIONS} />
        </div>

        {results.length === 0 ? (
          empty ?? <EmptyState title="No products found." message="Try another search or browse categories." actionLabel="Browse categories" actionTo="/categories/electronics" />
        ) : (
          <>
            <div className="product-grid">
              {results.slice(0, visible).map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
            {visible < results.length && (
              <div className="load-more">
                <Button variant="secondary" onClick={() => setVisible(visible + PAGE_SIZE)}>
                  Load more ({results.length - visible} left)
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
