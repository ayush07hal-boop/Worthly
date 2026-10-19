import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import Icon from '../components/Icon'
import NotFound from './NotFound'
import { getCategories, getCategoryById, getProducts, sortProducts } from '../services/productService'

export default function Category() {
  const { category: categoryId } = useParams()
  const category = getCategoryById(categoryId)
  if (!category) return <NotFound />

  const items = getProducts().filter((product) => product.category === category.id)
  const sections = [
    { title: 'Featured products', label: 'Editors’ picks', items: sortProducts(items, 'trending').slice(0, 1) },
    { title: 'Popular products', label: 'Trending now', items: sortProducts(items, 'trending') },
    { title: 'Highest rated', label: 'Top scores', items: sortProducts(items, 'rating').slice(0, 3) },
    { title: 'Most reviewed', label: 'Most discussed', items: sortProducts(items, 'reviews').slice(0, 3) },
  ].filter((section, index) => section.items.length > 0 && (items.length > 1 || index === 1))

  return (
    <>
      <PageHeader title={category.name} subtitle={category.intro}>
        <nav className="pill-row" aria-label="Categories">
          {getCategories().map((entry) => (
            <Link key={entry.id} to={`/categories/${entry.id}`} className={`pill ${entry.id === category.id ? 'is-active' : ''}`} aria-current={entry.id === category.id ? 'page' : undefined}>
              <Icon name={entry.icon} size={15} /> {entry.name}
            </Link>
          ))}
        </nav>
      </PageHeader>

      <div className="container">
        {sections.map((section) => (
          <section key={section.title} className="section-tight" aria-labelledby={`sec-${section.title}`}>
            <SectionHeading label={section.label} title={section.title} id={`sec-${section.title}`} />
            <div className="product-grid">
              {section.items.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </section>
        ))}
        {sections.length === 0 && <p className="muted">No products in this category yet.</p>}
      </div>
    </>
  )
}
