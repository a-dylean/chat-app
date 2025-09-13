// test/setup.ts
import { vi } from 'vitest'

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
