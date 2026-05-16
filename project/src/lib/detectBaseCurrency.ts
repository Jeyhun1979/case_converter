import { LOCALE_CURRENCY } from './currencies'

const FALLBACK = 'USD'

export function detectBaseCurrencyFromLocale(locale?: string): string {
  const tag = (locale ?? navigator.language).toLowerCase()
  const region = tag.split('-')[1]
  if (region && LOCALE_CURRENCY[region]) {
    return LOCALE_CURRENCY[region]
  }
  const lang = tag.split('-')[0]
  if (lang && LOCALE_CURRENCY[lang]) {
    return LOCALE_CURRENCY[lang]
  }
  return FALLBACK
}
