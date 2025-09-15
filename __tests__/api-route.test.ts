import { describe, test, expect, vi } from 'vitest'

vi.mock('../app/api/chat/mistral-client', () => ({
  completeChat: vi.fn(async (messages: any[], model?: string) => ({ content: 'ok:' + (model || '') })),
}))

import { POST } from '../app/api/chat/route'

describe('API /api/chat POST', () => {
  test('validates messages', async () => {
    const res = await POST({ json: async () => ({ messages: [] }) } as any)
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toBeDefined()
  })

  test('returns assistant content', async () => {
    const res = await POST({ json: async () => ({ messages: [{ role: 'user', content: 'hi' }], model: 'm' }) } as any)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.content).toContain('ok')
  })

  test('handles internal error', async () => {
    const { completeChat } = await import('../app/api/chat/mistral-client')
    ;(completeChat as any).mockRejectedValueOnce(new Error('boom'))
    const res = await POST({ json: async () => ({ messages: [{ role: 'user', content: 'x' }] }) } as any)
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.error).toBeDefined()
  })
})

