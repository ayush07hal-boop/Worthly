import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Home from './pages/Home'
import Products from './pages/Products'
import Trending from './pages/Trending'
import Search from './pages/Search'
import Category from './pages/Category'
import ProductDetail from './pages/ProductDetail'
import Compare from './pages/Compare'
import Wishlist from './pages/Wishlist'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories" element={<Navigate to="/categories/electronics" replace />} />
        <Route path="/categories/:category" element={<Category />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}
