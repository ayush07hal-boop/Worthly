import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MainLayout() {
  const { pathname, hash } = useLocation()

  // Scroll to top on navigation, or to the #anchor when one is given.
  useEffect(() => {
    if (hash) {
      setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 60)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main" key={pathname} className="page">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
