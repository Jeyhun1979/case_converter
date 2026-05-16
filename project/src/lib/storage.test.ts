import { afterEach, describe, expect, it } from 'vitest'
import { loadBaseCurrency, saveBaseCurrency } from './storage'

describe('storage', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('returns fallback when nothing stored', () => {
    expect(loadBaseCurrency('EUR')).toBe('EUR')
  })

  it('persists and loads base currency', () => {
    saveBaseCurrency('GBP')
    expect(loadBaseCurrency('USD')).toBe('GBP')
  })

  it('ignores invalid stored value', () => {
    localStorage.setItem('fx-base-currency', 'INVALID')
    expect(loadBaseCurrency('USD')).toBe('USD')
  })
})
