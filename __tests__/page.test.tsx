import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import { Provider } from '@/components/ui/provider'
import * as React from 'react'
 
test('Page', () => {
  render(
    <Provider>
      <Page />
    </Provider>
  )
  expect(screen.getByRole('heading', { level: 1, name: 'Mistral AI Chat' })).toBeDefined()
})

// test('Page shows messages area when it has messages', () => {
//   vi.spyOn(React, 'useState').mockImplementationOnce(() => [
//     [{ role: 'user', content: 'hello world' }],
//     vi.fn(),
//   ] as any)
//   render(
//     <Provider>
//       <Page />
//     </Provider>
//   )
//   // Icon should not be present, but message content should
//   expect(screen.queryByAltText('Mistral AI Chat')).toBeNull()
// })
