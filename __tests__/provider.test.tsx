import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { Provider } from '@/components/ui/provider'

describe('Provider', () => {
  test('renders children', () => {
    render(
      <Provider>
        <div>child</div>
      </Provider>
    )
    expect(screen.getByText('child')).toBeInTheDocument()
  })
})

