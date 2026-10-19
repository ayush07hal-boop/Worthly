import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function CategoryCard({ category, index }) {
  return (
    <Link to={`/categories/${category.id}`} className="category-card">
      <div className="category-card-top">
        <span className="category-icon"><Icon name={category.icon} size={22} /></span>
        <span className="category-number">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
      <Icon name="arrow" size={16} className="category-arrow" />
    </Link>
  )
}
