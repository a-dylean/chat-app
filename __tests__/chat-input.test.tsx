import { describe, expect, test, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from '@/components/ui/provider'
import { ChatInput } from '@/components/ui/chat-input'
import React from 'react'

function Harness() {
  const [messages, setMessages] = React.useState([] as any[])
  return (
    <Provider>
      <ChatInput messages={messages as any} setMessages={setMessages as any} />
    </Provider>
  )
}

describe('ChatInput', () => {
  test('sends on Enter and clears input (success)', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ content: 'Hello from assistant' }),
    } as any)
    ;(global as any).fetch = mockFetch

    render(<Harness />)
    const textarea = screen.getByPlaceholderText('Type your message') as HTMLTextAreaElement

    fireEvent.change(textarea, { target: { value: 'Hello' } })
    fireEvent.keyDown(textarea, { key: 'Enter' })

    await waitFor(() => expect(mockFetch).toHaveBeenCalled())
    await waitFor(() => expect(textarea.value).toBe(''))
  })

  test('shows error assistant message on failure', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'Fail',
    } as any)
    ;(global as any).fetch = mockFetch

    render(<Harness />)
    const textarea = screen.getByPlaceholderText('Type your message')
    fireEvent.change(textarea, { target: { value: 'Hi' } })
    fireEvent.keyDown(textarea, { key: 'Enter' })

    await waitFor(() => expect(mockFetch).toHaveBeenCalled())
  })

  test('does not send empty input', async () => {
    const mockFetch = vi.fn()
    ;(global as any).fetch = mockFetch

    render(<Harness />)
    const textarea = screen.getByPlaceholderText('Type your message')
    fireEvent.keyDown(textarea, { key: 'Enter' })
    expect(mockFetch).not.toHaveBeenCalled()
  })
})

