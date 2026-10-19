import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useToast } from './ToastContext'

export const MAX_COMPARE = 4
const CompareContext = createContext(null)

export function CompareProvider({ children }) {
  const [ids, setIds] = useState([])
  const { showToast } = useToast()

  const isComparing = useCallback((id) => ids.includes(id), [ids])

  const toggleCompare = useCallback(
    (product) => {
      if (ids.includes(product.id)) {
        setIds(ids.filter((id) => id !== product.id))
      } else if (ids.length >= MAX_COMPARE) {
        showToast(`You can compare up to ${MAX_COMPARE} products`, 'error')
      } else {
        setIds([...ids, product.id])
        showToast(`Added ${product.name} to compare`)
      }
    },
    [ids, showToast],
  )

  const removeFromCompare = useCallback((id) => setIds((list) => list.filter((item) => item !== id)), [])

  const value = useMemo(
    () => ({ ids, isComparing, toggleCompare, removeFromCompare }),
    [ids, isComparing, toggleCompare, removeFromCompare],
  )
  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) throw new Error('useCompare must be used inside CompareProvider')
  return context
}
