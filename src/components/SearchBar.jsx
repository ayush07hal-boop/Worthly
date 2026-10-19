import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'

export default function SearchBar({ initialValue = '' }) {
  const [query, setQuery] = useState(initialValue)
  const navigate = useNavigate()

  const submit = (event) => {
    event.preventDefault()
    const term = query.trim()
    navigate(term ? `/search?q=${encodeURIComponent(term)}` : '/products')
  }

  return (
    <form className="search-bar" onSubmit={submit} role="search">
      <Icon name="search" size={19} className="search-icon" />
      <label htmlFor="hero-search" className="sr-only">Search products, brands or categories</label>
      <input
        id="hero-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products, brands or categories"
        autoComplete="off"
      />
      <button type="submit" className="btn btn-primary btn-md">
        Search <Icon name="arrow" size={16} />
      </button>
    </form>
  )
}
