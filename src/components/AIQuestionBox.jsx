import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { askAboutProduct, SUGGESTED_QUESTIONS } from '../services/aiService'

export default function AIQuestionBox({ product }) {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [thinking, setThinking] = useState(false)
  const logRef = useRef(null)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  const ask = (text) => {
    const trimmed = text.trim()
    if (!trimmed || thinking) return
    setMessages((list) => [...list, { role: 'user', text: trimmed }])
    setQuestion('')
    setThinking(true)
    timer.current = setTimeout(() => {
      setMessages((list) => [...list, { role: 'ai', text: askAboutProduct(product, trimmed) }])
      setThinking(false)
    }, 700)
  }

  const submit = (event) => {
    event.preventDefault()
    ask(question)
  }

  return (
    <section className="card ask-box" aria-labelledby="ask-title">
      <h2 id="ask-title" className="card-title">Ask about this product</h2>
      <div className="chip-row">
        {SUGGESTED_QUESTIONS.map((suggestion) => (
          <button key={suggestion} type="button" className="chip" onClick={() => ask(suggestion)}>{suggestion}</button>
        ))}
      </div>

      <div className="chat-log" ref={logRef} aria-live="polite">
        {messages.length === 0 && (
          <p className="chat-empty">Pick a question above or type your own. Answers are drawn from community reviews.</p>
        )}
        {messages.map((message, index) => (
          <div key={index} className={`chat-message chat-${message.role}`}>
            {message.role === 'ai' && <span className="chat-avatar"><Icon name="sparkle" size={14} /></span>}
            <p>{message.text}</p>
          </div>
        ))}
        {thinking && (
          <div className="chat-message chat-ai">
            <span className="chat-avatar"><Icon name="sparkle" size={14} /></span>
            <p className="typing" aria-label="Thinking"><i /><i /><i /></p>
          </div>
        )}
      </div>

      <form className="chat-form" onSubmit={submit}>
        <label htmlFor="ask-input" className="sr-only">Ask something about this product</label>
        <input id="ask-input" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask something about this product..." autoComplete="off" />
        <button type="submit" className="btn btn-primary btn-md" disabled={!question.trim() || thinking} aria-label="Send question">
          <Icon name="send" size={16} />
        </button>
      </form>
      <p className="ai-disclaimer">Demo answers only. AI integration coming soon.</p>
    </section>
  )
}
