import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProductExplorer from '../components/ProductExplorer'
import SearchBar from '../components/SearchBar'
import EmptyState from '../components/EmptyState'
import { searchProducts } from '../services/productService'

export default function Search() {
  const [params] = useSearchParams()
  const query = params.get('q')?.trim() ?? ''
  const results = searchProducts(query)

  return (
    <>
      <PageHeader
        title={query ? `Search results for: "${query}"` : 'Search products'}
        subtitle={query ? `${results.length} ${results.length === 1 ? 'result' : 'results'} found` : 'Search by product, brand or category.'}
      >
        <div className="page-header-search"><SearchBar key={query} initialValue={query} /></div>
      </PageHeader>
      <div className="container section-tight">
        {/* key resets filters and pagination whenever the query changes */}
        <ProductExplorer
          key={query}
          products={results}
          empty={<EmptyState title="No products found." message="Try another search or browse categories." actionLabel="Browse categories" actionTo="/categories/electronics" />}
        />
      </div>
    </>
  )
}
