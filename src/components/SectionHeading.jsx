import { Link } from 'react-router-dom'

export default function SectionHeading({ label, title, linkText, linkTo, id }) {
  return (
    <div className="section-heading">
      <div>
        {label && <p className="eyebrow">{label}</p>}
        <h2 id={id}>{title}</h2>
      </div>
      {linkText && <Link to={linkTo} className="text-link">{linkText}</Link>}
    </div>
  )
}
