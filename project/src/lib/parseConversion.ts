import type { TranslationKey } from '../i18n/translations'
import { isValidCode, normalizeCode } from './currencies'

export type ParsedConversion = {
  amount: number
  from: string
  to: string
}

export type ParseErrorCode =
  | 'parse.empty'
  | 'parse.invalidAmount'
  | 'parse.unknownCurrency'
  | 'parse.sameCurrency'
  | 'parse.invalidFormat'

export type ParseResult =
  | { ok: true; value: ParsedConversion }
  | { ok: false; code: ParseErrorCode; params?: Record<string, string> }

const PATTERNS = [
  /^(\d+(?:[.,]\d+)?)\s*([a-zA-Z]{3})\s+(?:in|to|→|->)\s+([a-zA-Z]{3})$/,
  /^(\d+(?:[.,]\d+)?)\s*([a-zA-Z]{3})\s+([a-zA-Z]{3})$/,
]

export function parseConversionInput(input: string): ParseResult {
  const trimmed = input.trim()
  if (!trimmed) {
    return { ok: false, code: 'parse.empty' }
  }

  for (const pattern of PATTERNS) {
    const match = trimmed.match(pattern)
    if (!match) continue

    const amount = Number.parseFloat(match[1].replace(',', '.'))
    const from = normalizeCode(match[2])
    const to = normalizeCode(match[3])

    if (!Number.isFinite(amount) || amount < 0) {
      return { ok: false, code: 'parse.invalidAmount' }
    }
    if (!isValidCode(from)) {
      return { ok: false, code: 'parse.unknownCurrency', params: { code: match[2] } }
    }
    if (!isValidCode(to)) {
      return { ok: false, code: 'parse.unknownCurrency', params: { code: match[3] } }
    }
    if (from === to) {
      return { ok: false, code: 'parse.sameCurrency' }
    }

    return { ok: true, value: { amount, from, to } }
  }

  return { ok: false, code: 'parse.invalidFormat' }
}

export function isParseErrorCode(code: string): code is ParseErrorCode {
  return code.startsWith('parse.')
}

export function isApiErrorCode(code: string): code is TranslationKey {
  return code.startsWith('api.')
}
