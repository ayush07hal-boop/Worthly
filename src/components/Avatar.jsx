import { useState } from 'react'

const colors = ['#4382df', '#2f6fcc', '#5f97e6', '#3a8aa6', '#4f7fc0', '#2a63bd']

export default function Avatar({ name = '', size = 40, src = null }) {
  const [imageError, setImageError] = useState(false)
  const initials = name ? name.split(/[\s._]+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase() : 'U'
  const color = colors[(name || 'U').length % colors.length]

  if (src && !imageError) {
    return (
      <img
        src={src}
        alt={name}
        className="avatar avatar-img"
        style={{ width: size, height: size, objectFit: 'cover', borderRadius: '50%' }}
        onError={() => setImageError(true)}
      />
    )
  }

  return (
    <span className="avatar" style={{ width: size, height: size, background: `${color}33`, color, fontSize: size * 0.38 }} aria-hidden="true">
      {initials}
    </span>
  )
}
