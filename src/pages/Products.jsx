import PageHeader from '../components/PageHeader'
import ProductExplorer from '../components/ProductExplorer'
import { getProducts } from '../services/productService'

export default function Products() {
  return (
    <>
      <PageHeader title="Explore products" subtitle="Discover what the community thinks is worth buying." />
      <div className="container section-tight">
        <ProductExplorer products={getProducts()} />
      </div>
    </>
  )
}
