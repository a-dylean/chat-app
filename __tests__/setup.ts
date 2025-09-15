// test/setup.ts
import React from 'react'
import { vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

// Ensure jsdom has matchMedia before anything imports next-themes
const makeMatchMedia = () =>
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),            // deprecated APIs some libs still call
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
if (!('matchMedia' in globalThis) || typeof (globalThis as any).matchMedia !== 'function') {
  ;(globalThis as any).matchMedia = (window as any).matchMedia
}

// Mock next/image to plain img element to avoid Next internals
vi.mock('next/image', () => ({
  default: (props: any) => {
    const { src, alt, ...rest } = props || {}
    const resolvedSrc = typeof src === 'string' ? src : src?.src ?? ''
    return React.createElement('img', { src: resolvedSrc, alt: alt ?? '', ...rest })
  },
}))

// Mock next/dynamic so dynamic components don't load chunks during tests
vi.mock('next/dynamic', () => ({
  default: (_loader: any) => function DynamicStub() { return null },
}))

// Minimal ResizeObserver polyfill
class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-expect-error polyfill for tests
global.ResizeObserver = global.ResizeObserver || RO
