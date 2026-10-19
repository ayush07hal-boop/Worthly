import Icon from './Icon'
import Button from './Button'

export default function EmptyState({ icon = 'search', title, message, actionLabel, actionTo }) {
  return (
    <div className="empty-state">
      <span className="empty-icon"><Icon name={icon} size={26} /></span>
      <h2>{title}</h2>
      <p>{message}</p>
      {actionLabel && <Button to={actionTo}>{actionLabel}</Button>}
    </div>
  )
}
