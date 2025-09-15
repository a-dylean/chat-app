import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { Provider } from '@/components/ui/provider'
import { MessageItem } from '@/components/ui/message-item'

const renderWithProvider = (ui: React.ReactNode) => render(<Provider>{ui}</Provider>)

describe('MessageItem markdown', () => {
  test('renders markdown with code and links', () => {
    renderWithProvider(
      <MessageItem
        message={{
          role: 'assistant',
          content: '# Title\nSome `code` and a [link](https://example.com)\n\n```js\nconsole.log("hi")\n```',
        } as any}
      />
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('code')).toBeInTheDocument()
    const link = screen.getByRole('link', { name: 'link' }) as HTMLAnchorElement
    expect(link.href).toContain('https://example.com')
  })

  test('renders user message text', () => {
    renderWithProvider(
      <MessageItem
        message={{
          role: 'user',
          content: 'Plain user text',
        } as any}
      />
    )
    expect(screen.getByText('Plain user text')).toBeInTheDocument()
  })
})
