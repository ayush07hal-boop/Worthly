import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import Icon from '../components/Icon'
import { ADMIN_NAV } from '../services/adminService'

const navIcons = {
  Dashboard: 'dashboard', Users: 'users', Products: 'box', Reviews: 'chat',
  Reports: 'flag', Categories: 'layers', 'Affiliate Links': 'link', Settings: 'settings',
}

export default function AdminLayout({ active, onNavigate, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${open ? 'is-open' : ''}`}>
        <div className="admin-brand"><Logo /><span className="badge badge-accent">Admin</span></div>
        <nav aria-label="Admin navigation">
          {ADMIN_NAV.map((item) => (
            <button
              key={item}
              type="button"
              className={`admin-link ${active === item ? 'is-active' : ''}`}
              aria-current={active === item ? 'page' : undefined}
              onClick={() => { onNavigate(item); setOpen(false) }}
            >
              <Icon name={navIcons[item]} size={18} /> {item}
            </button>
          ))}
        </nav>
        <Link to="/" className="admin-exit text-link">Back to Worthly</Link>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button type="button" className="icon-btn admin-menu" onClick={() => setOpen(!open)} aria-label="Toggle admin menu" aria-expanded={open}>
            <Icon name="menu" />
          </button>
          <h1>{active}</h1>
          <span className="admin-user">Admin</span>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  )
}
