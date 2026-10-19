const colors = ['#4382df', '#2f6fcc', '#5f97e6', '#3a8aa6', '#4f7fc0', '#2a63bd']

export default function Avatar({ name, size = 40 }) {
  const initials = name.split(/[\s._]+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  const color = colors[name.length % colors.length]
  return (
    <span className="avatar" style={{ width: size, height: size, background: `${color}33`, color, fontSize: size * 0.38 }} aria-hidden="true">
      {initials}
    </span>
  )
}
