import { getProducts } from './productService'
import { getAllReviews } from './reviewService'
import { users } from '../data/users'

export function getAdminStats() {
  return [
    { label: 'Total Users', value: '12,480', change: '+4.2%' },
    { label: 'Total Products', value: (getProducts().length * 214).toLocaleString('en-IN'), change: '+1.8%' },
    { label: 'Total Reviews', value: '48,932', change: '+6.5%' },
    { label: 'Reports', value: '37', change: '-12%' },
    { label: 'Reviews Today', value: '212', change: '+9.1%' },
  ]
}

export function getRecentReviews() {
  return getAllReviews()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .map((review) => ({ ...review, user: users.find((u) => u.id === review.userId) }))
}

export function getRecentReports() {
  return [
    { id: 'rp1', target: 'Review on iPhone 17', reason: 'Spam or promotion', reporter: 'kabir.s', status: 'Open' },
    { id: 'rp2', target: 'Review on Nike Air Max 270', reason: 'Offensive language', reporter: 'meera_j', status: 'In review' },
    { id: 'rp3', target: 'Review on PlayStation 5 Slim', reason: 'Fake review', reporter: 'priya.k', status: 'Open' },
    { id: 'rp4', target: 'Comment on MacBook Air M4', reason: 'Off topic', reporter: 'rohan_dev', status: 'Resolved' },
  ]
}

export function getPopularProducts() {
  return [...getProducts()].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5)
}

export function getUserActivity() {
  return [
    { day: 'Mon', value: 62 }, { day: 'Tue', value: 78 }, { day: 'Wed', value: 71 },
    { day: 'Thu', value: 94 }, { day: 'Fri', value: 88 }, { day: 'Sat', value: 55 }, { day: 'Sun', value: 48 },
  ]
}

export const ADMIN_NAV = ['Dashboard', 'Users', 'Products', 'Reviews', 'Reports', 'Categories', 'Affiliate Links', 'Settings']
