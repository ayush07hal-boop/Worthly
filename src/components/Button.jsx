import { Link } from 'react-router-dom'

// Renders a <Link> when `to` is given, an <a> when `href` is given, otherwise a <button>.
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  type = 'button',
  block = false,
  ...rest
}) {
  const classes = `btn btn-${variant} btn-${size} ${block ? 'btn-block' : ''} ${className}`.trim()
  if (to) return <Link to={to} className={classes} {...rest}>{children}</Link>
  if (href) return <a href={href} className={classes} {...rest}>{children}</a>
  return <button type={type} className={classes} {...rest}>{children}</button>
}
