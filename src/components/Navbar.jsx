import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Icon from './Icon'
import Button from './Button'
import Avatar from './Avatar'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/products', label: 'Discover' },
  { to: '/categories/electronics', label: 'Categories', match: '/categories' },
  { to: '/trending', label: 'Trending' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { ids } = useWishlist()
  const { user, logout } = useAuth()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const linkClass = ({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`
  const categoriesActive = pathname.startsWith('/categories')

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-inner container">
        <Logo />

        <nav className="nav-links" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={link.match ? `nav-link ${categoriesActive ? 'is-active' : ''}` : linkClass} end={!link.match}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <NavLink to="/wishlist" className="icon-btn nav-wishlist" aria-label={`Wishlist, ${ids.length} saved`}>
            <Icon name="heart" size={19} />
            {ids.length > 0 && <span className="nav-count">{ids.length}</span>}
          </NavLink>
          {user ? (
            <>
              <NavLink to={`/profile/${user.id}`} className="nav-user-pill" title={`Signed in as ${user.name}`}>
                <Avatar name={user.name} src={user.picture} size={28} />
                <span className="nav-user-name">{user.name.split(' ')[0]}</span>
              </NavLink>
              <Button variant="ghost" size="sm" className="nav-auth" onClick={logout}>Sign Out</Button>
            </>
          ) : (
            <Button to="/login" size="sm" className="nav-auth">Sign In</Button>
          )}
          <button
            type="button"
            className="icon-btn nav-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile navigation" className="mobile-menu-inner">
          {[...links, { to: '/compare', label: 'Compare' }, { to: '/wishlist', label: 'Wishlist' }].map((link) => (
            <NavLink key={link.label} to={link.to} className="mobile-link">
              {link.label} <Icon name="chevronRight" size={16} />
            </NavLink>
          ))}
          <div className="mobile-auth">
            {user ? (
              <>
                <NavLink to={`/profile/${user.id}`} className="mobile-link" style={{ border: 'none', padding: '8px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Avatar name={user.name} src={user.picture} size={36} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{user.name}</div>
                      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--muted)' }}>{user.email || 'View Profile'}</div>
                    </div>
                  </div>
                </NavLink>
                <Button variant="secondary" block onClick={() => { logout(); setOpen(false) }}>Sign Out</Button>
              </>
            ) : (
              <Button to="/login" block onClick={() => setOpen(false)}>Sign In with Google</Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
