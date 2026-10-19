import Icon from './Icon'

export default function AISummary({ product }) {
  const { aiSummary, pros, cons } = product
  return (
    <section className="ai-summary" aria-labelledby="ai-title">
      <div className="ai-summary-head">
        <h2 id="ai-title">What the community says</h2>
        <span className="ai-badge"><Icon name="sparkle" size={14} /> AI-generated summary</span>
      </div>
      <p className="ai-text">{aiSummary.summary}</p>
      <div className="ai-columns">
        <div>
          <h3 className="ai-sub">What people like</h3>
          <ul className="ai-list ai-like">
            {pros.map((pro) => <li key={pro}><Icon name="plus" size={14} /> {pro}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="ai-sub">What people dislike</h3>
          <ul className="ai-list ai-dislike">
            {cons.map((con) => <li key={con}><Icon name="minus" size={14} /> {con}</li>)}
          </ul>
        </div>
      </div>
      <div className="ai-for">
        <h3 className="ai-sub">Who is it for?</h3>
        <p>{aiSummary.forWho}</p>
      </div>
      <p className="ai-disclaimer">Generated from community reviews. May not reflect every opinion.</p>
    </section>
  )
}
