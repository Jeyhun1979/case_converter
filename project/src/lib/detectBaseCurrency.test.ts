import { describe, expect, it } from 'vitest'
import { detectBaseCurrencyFromLocale } from './detectBaseCurrency'

describe('detectBaseCurrencyFromLocale', () => {
  it('detects RUB for ru-RU', () => {
    expect(detectBaseCurrencyFromLocale('ru-RU')).toBe('RUB')
  })

  it('detects USD for en-US', () => {
    expect(detectBaseCurrencyFromLocale('en-US')).toBe('USD')
  })

  it('detects EUR for de-DE', () => {
    expect(detectBaseCurrencyFromLocale('de-DE')).toBe('EUR')
  })

  it('falls back to USD for unknown locale', () => {
    expect(detectBaseCurrencyFromLocale('xx-YY')).toBe('USD')
  })
})
