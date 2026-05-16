import { describe, expect, it } from 'vitest'
import { parseConversionInput } from './parseConversion'

describe('parseConversionInput', () => {
  it('parses "15 usd in rub"', () => {
    const result = parseConversionInput('15 usd in rub')
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value).toEqual({ amount: 15, from: 'USD', to: 'RUB' })
    }
  })

  it('parses "100 eur to jpy"', () => {
    const result = parseConversionInput('100 eur to jpy')
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value).toEqual({ amount: 100, from: 'EUR', to: 'JPY' })
    }
  })

  it('parses decimal with comma', () => {
    const result = parseConversionInput('12,5 gbp usd')
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value.amount).toBe(12.5)
    }
  })

  it('rejects same currency', () => {
    const result = parseConversionInput('10 usd in usd')
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.code).toBe('parse.sameCurrency')
  })

  it('rejects invalid format', () => {
    const result = parseConversionInput('hello world')
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.code).toBe('parse.invalidFormat')
  })

  it('rejects empty input', () => {
    const result = parseConversionInput('   ')
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.code).toBe('parse.empty')
  })
})
