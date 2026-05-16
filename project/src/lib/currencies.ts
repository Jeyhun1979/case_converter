export const LOCALE_CURRENCY: Record<string, string> = {
  ru: 'RUB',
  en: 'USD',
  de: 'EUR',
  fr: 'EUR',
  es: 'EUR',
  it: 'EUR',
  pt: 'EUR',
  pl: 'PLN',
  uk: 'UAH',
  ja: 'JPY',
  zh: 'CNY',
  ko: 'KRW',
  tr: 'TRY',
  in: 'INR',
  br: 'BRL',
  mx: 'MXN',
  ca: 'CAD',
  au: 'AUD',
  gb: 'GBP',
  us: 'USD',
}

export const POPULAR = [
  'USD',
  'EUR',
  'GBP',
  'RUB',
  'JPY',
  'CNY',
  'CHF',
  'CAD',
  'AUD',
  'PLN',
  'TRY',
  'INR',
  'BRL',
  'KRW',
  'SEK',
  'NOK',
  'DKK',
  'CZK',
  'HUF',
  'UAH',
] as const

export function normalizeCode(code: string): string {
  return code.trim().toUpperCase()
}

export function isValidCode(code: string): boolean {
  return /^[A-Z]{3}$/.test(code)
}
