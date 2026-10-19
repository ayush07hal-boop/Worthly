import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import Icon from '../components/Icon'

const features = [
  { icon: 'shield', title: 'Real Reviews', text: 'Opinions from people who actually use products.' },
  { icon: 'star', title: 'Community Ratings', text: 'Understand what buyers really think.' },
  { icon: 'sparkle', title: 'AI-Powered Insights', text: 'Get the important information without reading hundreds of reviews.' },
  { icon: 'compare', title: 'Compare Before You Buy', text: 'Understand the differences between products.' },
]

const steps = [
  { title: 'Discover', text: "Find the product you're interested in." },
  { title: 'Research', text: 'Read reviews, ratings and community insights.' },
  { title: 'Decide', text: 'Compare products and choose what fits you.' },
]

const trust = [
  { icon: 'shield', label: 'Honest, independent reviews' },
  { icon: 'users', label: 'Community-driven ratings' },
  { icon: 'sparkle', label: 'AI summaries of what matters' },
  { icon: 'check', label: 'Free to use' },
]

const suggestions = ['iPhone 17', 'Nike shoes', 'wireless headphones']

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-inner">
          <p className="eyebrow eyebrow-dot">Real people. Real experiences.</p>
          <h1 id="hero-title">
            Know what it&apos;s<br />
            <span className="text-gradient">worth buying.</span>
          </h1>
          <p className="hero-sub">
            Honest opinions from people who actually use the products.<br />
            Discover what&apos;s worth your money before you buy.
          </p>
          <SearchBar />
          <p className="hero-hint">
            Try{' '}
            {suggestions.map((term, index) => (
              <span key={term}>
                <Link to={`/search?q=${encodeURIComponent(term)}`}>&ldquo;{term}&rdquo;</Link>
                {index < suggestions.length - 2 ? ', ' : index === suggestions.length - 2 ? ' or ' : ''}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="trust-strip" aria-label="Why trust Worthly">
        <ul className="container trust-list">
          {trust.map((item) => (
            <li key={item.label}><Icon name={item.icon} size={18} /> {item.label}</li>
          ))}
        </ul>
      </section>

      <section className="section why" aria-labelledby="why-title">
        <div className="container why-inner">
          <div className="why-intro">
            <p className="eyebrow">Why Worthly</p>
            <h2 id="why-title">Buy with confidence.</h2>
            <p className="muted">Everything you need to make a decision you will not regret, in one place.</p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature">
                <span className="feature-icon"><Icon name={feature.icon} size={20} /></span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="how-title">
        <SectionHeading label="How it works" title="Three steps to a better purchase" id="how-title" />
        <ol className="steps">
          {steps.map((step, index) => (
            <li key={step.title} className="step">
              <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section-cta">
        <div className="cta">
          <h2>Know before you buy.</h2>
          <p>Make better purchase decisions with real experiences from real people.</p>
          <Button to="/products" size="lg">Explore Products <Icon name="arrow" size={17} /></Button>
        </div>
      </section>
    </>
  )
}
