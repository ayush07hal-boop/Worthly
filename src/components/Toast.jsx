import Icon from './Icon'

export default function Toast({ message, type = 'success', onClose }) {
  return (
    <div className={`toast toast-${type}`} role="status">
      <Icon name={type === 'error' ? 'close' : 'check'} size={16} />
      <span>{message}</span>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Dismiss notification">
        <Icon name="close" size={14} />
      </button>
    </div>
  )
}
