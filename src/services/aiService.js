// Mock "Ask about this product" service. Replace with a call to the AI endpoint later.
const canned = [
  { match: ['student', 'college'], answer: (p) => `Reviewers who are students say the ${p.name} is a strong pick for daily use. Most mention it is reliable and holds up through long days. The main caution is the price, so check student discounts.` },
  { match: ['battery'], answer: (p) => `Battery feedback for the ${p.name} is mixed but mostly positive. ${p.cons.some((c) => /battery/i.test(c)) ? 'A noticeable share of owners wish it lasted longer under heavy use.' : 'Most owners say it comfortably lasts through a normal day.'}` },
  { match: ['upgrad'], answer: (p) => `If you own last year's model, most reviewers say the upgrade is small. If you are coming from something two or more generations old, they describe the ${p.name} as a big step up.` },
  { match: ['complain', 'dislike', 'problem', 'issue', 'cons'], answer: (p) => `The most common complaints about the ${p.name}: ${p.cons.join('; ').toLowerCase()}. Most reviewers still rate it highly overall.` },
]

export function askAboutProduct(product, question) {
  const q = question.toLowerCase()
  const hit = canned.find((entry) => entry.match.some((word) => q.includes(word)))
  if (hit) return hit.answer(product)
  return `Based on ${product.reviewCount.toLocaleString('en-IN')} reviews, people mostly like: ${product.pros.join(', ').toLowerCase()}. The main downsides: ${product.cons.join(', ').toLowerCase()}. Try asking about battery, price or who it is best for.`
}

export const SUGGESTED_QUESTIONS = [
  'Is it good for students?',
  'How is the battery?',
  'Is it worth upgrading?',
  'What do users complain about?',
]
