import { useEffect, useRef } from 'react'
import Icon from './Icon'

export default function Modal({ open, title, onClose, children }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const previouslyFocused = document.activeElement
    const onKey = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={panelRef}>
        <header className="modal-header">
          <h2>{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close dialog">
            <Icon name="close" />
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
