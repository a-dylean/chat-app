import { describe, test, expect } from 'vitest'
import { PROMPT_TEMPLATES } from '@/app/prompts'

describe('PROMPT_TEMPLATES', () => {
  test('contains required labels and structured text', () => {
    const labels = PROMPT_TEMPLATES.map(p => p.label)
    expect(labels).toContain('Summarize (TL;DR + Insights)')
    expect(labels).toContain('Translate → English (Preserve Formatting)')
    expect(labels).toContain('Explain Code (Overview • Complexity • Risks)')
  })
})

