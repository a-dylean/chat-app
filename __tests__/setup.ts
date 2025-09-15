import '@testing-library/jest-dom/vitest'
import React from 'react'
import { vi } from 'vitest'


// Ensure jsdom has matchMedia before anything imports next-themes
const makeMatchMedia = () =>
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),            
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))

// Define on window
if (!('matchMedia' in window) || typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: makeMatchMedia(),
  })
}

// Also mirror to globalThis (some libs reference globalThis directly)
if (
  !('matchMedia' in globalThis) ||
  typeof (globalThis as typeof globalThis & { matchMedia?: typeof window.matchMedia }).matchMedia !== 'function'
) {
  const g = globalThis as typeof globalThis & {
    matchMedia?: typeof window.matchMedia
  }
  g.matchMedia = window.matchMedia
}

// Mock next/image to plain img element to avoid Next internals
vi.mock('next/image', () => ({
  default: (
    props: ({ src?: string | { src?: string } } & { alt?: string }) &
      Record<string, unknown>
  ) => {
    const { src, alt, ...rest } = props || {}
    const resolvedSrc = typeof src === 'string' ? src : src?.src ?? ''
    return React.createElement('img', {
      src: resolvedSrc,
      alt: alt ?? '',
      ...(rest as React.ImgHTMLAttributes<HTMLImageElement>),
    })
  },
}))

// Mock next/dynamic so dynamic components don't load chunks during tests
vi.mock('next/dynamic', () => ({
  default: () => function DynamicStub() { return null },
}))
