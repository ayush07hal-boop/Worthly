import PageHeader from '../components/PageHeader'
import ProductExplorer from '../components/ProductExplorer'
import { getProducts } from '../services/productService'

export default function Trending() {
  return (
    <>
      <PageHeader title="Trending products" subtitle="What the community is talking about right now." />
      <div className="container section-tight">
        <ProductExplorer products={getProducts()} defaultSort="trending" />
      </div>
    </>
  )
}
