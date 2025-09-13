import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import { Provider } from '@/components/ui/provider'
 
test('Page', () => {
  render(
    <Provider>
      <Page />
    </Provider>
  )
  expect(screen.getByRole('heading', { level: 1, name: 'Mistral AI Chat' })).toBeDefined()
})
