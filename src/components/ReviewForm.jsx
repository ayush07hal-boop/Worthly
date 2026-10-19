import { useState } from 'react'
import { StarInput } from './Rating'
import Button from './Button'
import { ASPECTS } from '../utils/format'

const emptyAspects = Object.fromEntries(ASPECTS.map(({ key }) => [key, 0]))

export default function ReviewForm({ productName, onSubmit }) {
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [aspects, setAspects] = useState(emptyAspects)
  const [status, setStatus] = useState('owner')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = {}
    if (!rating) next.rating = 'Please choose an overall rating.'
    if (title.trim().length < 5) next.title = 'Give your review a title (at least 5 characters).'
    if (body.trim().length < 30) next.body = 'Tell us a bit more (at least 30 characters).'
    return next
  }

  const submit = (event) => {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSubmit({ rating, title: title.trim(), body: body.trim(), aspects, status })
    setRating(0)
    setTitle('')
    setBody('')
    setAspects(emptyAspects)
  }

  return (
    <form className="card review-form" onSubmit={submit} noValidate aria-labelledby="write-review-title">
      <h2 id="write-review-title" className="card-title">Write a review</h2>
      <p className="muted">Share your honest experience with {productName}.</p>

      <div className="field">
        <span className="field-label" id="overall-label">Overall rating</span>
        <StarInput label="Overall rating" value={rating} onChange={setRating} size={28} />
        {errors.rating && <p className="field-error" role="alert">{errors.rating}</p>}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="review-title">Review title</label>
        <input id="review-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sum it up in one line" aria-invalid={Boolean(errors.title)} />
        {errors.title && <p className="field-error" role="alert">{errors.title}</p>}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="review-body">Review text</label>
        <textarea id="review-body" rows={5} value={body} onChange={(e) => setBody(e.target.value)} placeholder="What did you like? What could be better?" aria-invalid={Boolean(errors.body)} />
        {errors.body && <p className="field-error" role="alert">{errors.body}</p>}
      </div>

      <div className="field">
        <span className="field-label">Rate the details (optional)</span>
        <div className="aspect-inputs">
          {ASPECTS.map(({ key, label }) => (
            <div key={key} className="aspect-input">
              <span>{key === 'value' ? 'Value for money' : label}</span>
              <StarInput label={label} value={aspects[key]} onChange={(n) => setAspects({ ...aspects, [key]: n })} size={20} />
            </div>
          ))}
        </div>
      </div>

      <fieldset className="radio-group">
        <legend className="field-label">Ownership</legend>
        <label className="radio"><input type="radio" name="ownership" checked={status === 'owner'} onChange={() => setStatus('owner')} /> I own this product</label>
        <label className="radio"><input type="radio" name="ownership" checked={status === 'used'} onChange={() => setStatus('used')} /> I have used this product</label>
      </fieldset>

      <Button type="submit" size="lg">Submit Review</Button>
    </form>
  )
}
