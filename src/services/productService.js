// Service layer. Every function returns mock data today.
// Later, swap the bodies for fetch() calls to the Express API; the components stay unchanged.
import { products } from '../data/products'
import { categories } from '../data/categories'

export const SORT_OPTIONS = [
  { value: 'relevant', label: 'Most Relevant' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'trending', label: 'Trending' },
]

export function getProducts() {
  return products
}

export function getProductById(id) {
  return products.find((product) => product.id === id) ?? null
}

export function getProductsByIds(ids) {
  return ids.map(getProductById).filter(Boolean)
}

export function getCategories() {
  return categories
}

export function getCategoryById(id) {
  return categories.find((category) => category.id === id) ?? null
}

export function getBrands() {
  return [...new Set(products.map((product) => product.brand))].sort()
}

export function getTrendingProducts(limit = 4) {
  return sortProducts(products, 'trending').slice(0, limit)
}

export function searchProducts(query) {
  const term = query.trim().toLowerCase()
  if (!term) return products
  return products.filter((product) => {
    const haystack = [product.name, product.brand, product.category, product.subcategory].join(' ').toLowerCase()
    return term.split(/\s+/).every((word) => haystack.includes(word))
  })
}

export function filterProducts(list, { categories: cats = [], brands = [], maxPrice = Infinity, minRating = 0 }) {
  return list.filter(
    (product) =>
      (cats.length === 0 || cats.includes(product.category)) &&
      (brands.length === 0 || brands.includes(product.brand)) &&
      product.price <= maxPrice &&
      product.rating >= minRating,
  )
}

export function sortProducts(list, sortBy) {
  const sorted = [...list]
  const sorters = {
    rating: (a, b) => b.rating - a.rating,
    reviews: (a, b) => b.reviewCount - a.reviewCount,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    trending: (a, b) => b.trendingScore - a.trendingScore,
  }
  return sorters[sortBy] ? sorted.sort(sorters[sortBy]) : sorted
}
