import { useState } from 'react'
import AdminLayout from '../layouts/AdminLayout'
import DataTable, { StatusBadge } from '../components/DataTable'
import { Stars } from '../components/Rating'
import Icon from '../components/Icon'
import { getAdminStats, getPopularProducts, getRecentReports, getRecentReviews, getUserActivity } from '../services/adminService'
import { getCategories, getProducts } from '../services/productService'
import { getAllReviews } from '../services/reviewService'
import { users } from '../data/users'
import { formatCount, formatDate, formatPrice } from '../utils/format'

function Panel({ title, children }) {
  return (
    <section className="card panel">
      <h2 className="card-title">{title}</h2>
      {children}
    </section>
  )
}

function Dashboard() {
  const stats = getAdminStats()
  const activity = getUserActivity()
  const peak = Math.max(...activity.map((d) => d.value))

  return (
    <>
      <div className="stat-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="card stat">
            <span className="muted">{stat.label}</span>
            <strong>{stat.value}</strong>
            <span className={`stat-change ${stat.change.startsWith('-') ? 'down' : 'up'}`}>{stat.change} this week</span>
          </div>
        ))}
      </div>

      <div className="admin-grid">
        <Panel title="User activity (last 7 days)">
          <div className="bars" role="img" aria-label="Daily active users over the last seven days">
            {activity.map((d) => (
              <div key={d.day} className="bar-col">
                <span className="bar-value">{d.value}</span>
                <div className="bar" style={{ height: `${(d.value / peak) * 100}%` }} />
                <span className="muted">{d.day}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Popular products">
          <ol className="popular-list">
            {getPopularProducts().map((product) => (
              <li key={product.id}><span>{product.name}</span><span className="muted">{formatCount(product.reviewCount)} reviews</span></li>
            ))}
          </ol>
        </Panel>

        <Panel title="Recent reviews">
          <DataTable caption="Recent reviews" rows={getRecentReviews()} columns={[
            { key: 'user', label: 'User', render: (r) => r.user.username },
            { key: 'title', label: 'Review' },
            { key: 'rating', label: 'Rating', render: (r) => <Stars value={r.rating} size={13} /> },
            { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
          ]} />
        </Panel>

        <Panel title="Recent reports">
          <DataTable caption="Recent reports" rows={getRecentReports()} columns={[
            { key: 'target', label: 'Content' },
            { key: 'reason', label: 'Reason' },
            { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
          ]} />
        </Panel>
      </div>
    </>
  )
}

const sections = {
  Dashboard,
  Users: () => (
    <Panel title="All users">
      <DataTable caption="Users" rows={users} columns={[
        { key: 'username', label: 'Username' },
        { key: 'name', label: 'Name' },
        { key: 'memberSince', label: 'Joined' },
        { key: 'helpfulVotes', label: 'Helpful votes' },
        { key: 'status', label: 'Status', render: () => <StatusBadge status="Active" /> },
      ]} />
    </Panel>
  ),
  Products: () => (
    <Panel title="All products">
      <DataTable caption="Products" rows={getProducts()} columns={[
        { key: 'name', label: 'Product' },
        { key: 'brand', label: 'Brand' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price', render: (r) => formatPrice(r.price) },
        { key: 'rating', label: 'Rating', render: (r) => r.rating.toFixed(1) },
      ]} />
    </Panel>
  ),
  Reviews: () => (
    <Panel title="All reviews">
      <DataTable caption="Reviews" rows={getAllReviews().slice(0, 15)} columns={[
        { key: 'title', label: 'Review' },
        { key: 'product', label: 'Product', render: (r) => r.product.name },
        { key: 'rating', label: 'Rating', render: (r) => r.rating },
        { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
      ]} />
    </Panel>
  ),
  Reports: () => (
    <Panel title="Reports queue">
      <DataTable caption="Reports" rows={getRecentReports()} columns={[
        { key: 'target', label: 'Content' },
        { key: 'reason', label: 'Reason' },
        { key: 'reporter', label: 'Reported by' },
        { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
      ]} />
    </Panel>
  ),
  Categories: () => (
    <Panel title="Categories">
      <DataTable caption="Categories" rows={getCategories()} columns={[
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'count', label: 'Products', render: (r) => getProducts().filter((p) => p.category === r.id).length },
      ]} />
    </Panel>
  ),
  'Affiliate Links': () => (
    <Panel title="Affiliate links">
      <DataTable caption="Affiliate links" rows={getProducts().flatMap((p) => p.stores.map((s) => ({ id: `${p.id}-${s.name}`, product: p.name, store: s.name, price: s.price })))} columns={[
        { key: 'product', label: 'Product' },
        { key: 'store', label: 'Store' },
        { key: 'price', label: 'Listed price', render: (r) => formatPrice(r.price) },
        { key: 'status', label: 'Status', render: () => <StatusBadge status="Active" /> },
      ]} />
    </Panel>
  ),
  Settings: () => (
    <Panel title="Platform settings">
      <p className="muted"><Icon name="settings" size={16} /> Settings will be available once the backend is connected.</p>
    </Panel>
  ),
}

export default function Admin() {
  const [active, setActive] = useState('Dashboard')
  const Section = sections[active]
  return (
    <AdminLayout active={active} onNavigate={setActive}>
      <Section />
    </AdminLayout>
  )
}
