const staticQuestions = [
  {
    id: 1,
    question: 'Which language runs in a web browser?',
    options: ['Java', 'C', 'Python', 'JavaScript'],
    answerIndex: 3,
  },
  {
    id: 2,
    question: 'What does CSS stand for?',
    options: [
      'Central Style Sheets',
      'Cascading Style Sheets',
      'Cascading Simple Sheets',
      'Cars SUVs Sailboats',
    ],
    answerIndex: 1,
  },
  {
    id: 3,
    question: 'What does HTML stand for?',
    options: [
      'HyperText Markup Language',
      'Hyper Trainer Marking Language',
      'HyperText Marketing Language',
      'Hyper Transfer Markup Language',
    ],
    answerIndex: 0,
  },
  {
    id: 4,
    question: 'What year was JavaScript launched?',
    options: ['1996', '1995', '1994', 'None of the above'],
    answerIndex: 1,
  },
  {
    id: 5,
    question: 'Inside which HTML element do we put the JavaScript?',
    options: ['<javascript>', '<js>', '<script>', '<scripting>'],
    answerIndex: 2,
  },
  {
    id: 6,
    question: 'Which tool can you use to ensure code quality?',
    options: ['Jest', 'Mocha', 'ESLint', 'Chai'],
    answerIndex: 2,
  },
  {
    id: 7,
    question: 'Which company developed React?',
    options: ['Google', 'Facebook', 'Twitter', 'Microsoft'],
    answerIndex: 1,
  },
  {
    id: 8,
    question: 'Which HTML attribute is used to define inline styles?',
    options: ['font', 'style', 'class', 'styles'],
    answerIndex: 1,
  },
  {
    id: 9,
    question: 'How do you write a comment in JavaScript?',
    options: ['/* comment */', '// comment', '<!-- comment -->', '# comment'],
    answerIndex: 1,
  },
  {
    id: 10,
    question: 'Which symbol is used for strict equality in JS?',
    options: ['==', '===', '=', '!='],
    answerIndex: 2,
  },
]

// PUBLIC_INTERFACE
export async function getQuestions() {
  /** Fetch questions from an API if VITE_API_BASE or VITE_BACKEND_URL is set;
   * otherwise return local static questions.
   * Returns items with shape: {id, question, options[], answerIndex}
   */
  try {
    const base = import.meta?.env?.VITE_API_BASE || import.meta?.env?.VITE_BACKEND_URL
    if (base) {
      const url = `${base.replace(/\/$/, '')}/api/quiz`
      const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } })
      if (!res.ok) {
        throw new Error(`Failed to fetch questions: ${res.status}`)
      }
      const data = await res.json()
      if (Array.isArray(data) && data.length) {
        return data
      }
    }
  } catch (e) {
    // fall back to static
    console.warn('Falling back to static questions:', e?.message || e)
  }
  return staticQuestions
}

export default staticQuestions
