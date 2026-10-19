import { Link } from 'react-router-dom'
import Logo from './Logo'

const columns = [
  { title: 'Product', links: [['Discover', '/products'], ['Categories', '/categories/electronics'], ['Trending', '/trending'], ['Compare', '/compare']] },
  { title: 'Community', links: [['Write a Review', '/products/iphone-17#write-review'], ['Discussions', '/products'], ['Wishlist', '/wishlist']] },
  { title: 'Company', links: [['About', '/'], ['Contact', '/'], ['Privacy', '/'], ['Terms', '/']] },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo />
          <p>Real people. Real products. Real experiences.</p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} className="footer-col" aria-label={column.title}>
            <h2>{column.title}</h2>
            <ul>
              {column.links.map(([label, to]) => (
                <li key={label}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container footer-bottom">
        <p>© 2026 Worthly. All rights reserved.</p>
      </div>
    </footer>
  )
}
