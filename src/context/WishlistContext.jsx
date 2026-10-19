import { createContext, useCallback, useContext, useMemo } from 'react'
import useStoredState from '../hooks/useStoredState'
import { useToast } from './ToastContext'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [ids, setIds] = useStoredState('worthly:wishlist', ['iphone-17', 'sony-wh-1000xm6', 'macbook-air-m4'])
  const { showToast } = useToast()

  const isWishlisted = useCallback((id) => ids.includes(id), [ids])

  const toggleWishlist = useCallback(
    (product) => {
      const exists = ids.includes(product.id)
      setIds(exists ? ids.filter((id) => id !== product.id) : [...ids, product.id])
      showToast(exists ? `Removed ${product.name} from wishlist` : `Saved ${product.name} to wishlist`, exists ? 'info' : 'success')
    },
    [ids, setIds, showToast],
  )

  const value = useMemo(() => ({ ids, isWishlisted, toggleWishlist }), [ids, isWishlisted, toggleWishlist])
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used inside WishlistProvider')
  return context
}
