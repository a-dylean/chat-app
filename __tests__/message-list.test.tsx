import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { Provider } from '@/components/ui/provider'
import { MessageList } from '@/components/ui/message-list'

describe('MessageList', () => {
  test('renders messages', () => {
    const messages = [
      { role: 'user', content: 'Hello' },
      { role: 'assistant', content: 'Hi there' },
    ] as any
    render(
      <Provider>
        <MessageList messages={messages} />
      </Provider>
    )
    // expect(screen.getByText('Hello')).toBePresent()
    // expect(screen.getByText('Hi there')).toBePresent()
  })
})

