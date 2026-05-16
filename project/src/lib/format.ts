import type { Locale } from '../i18n/translations'

function intlLocale(locale: Locale): string {
  return locale === 'ru' ? 'ru-RU' : 'en-US'
}

export function formatAmount(
  value: number,
  currency: string,
  locale: Locale,
): string {
  try {
    return new Intl.NumberFormat(intlLocale(locale), {
      style: 'currency',
      currency,
      maximumFractionDigits: value < 1 ? 6 : 2,
    }).format(value)
  } catch {
    return `${value.toFixed(2)} ${currency}`
  }
}

export function formatRate(value: number, locale: Locale): string {
  const loc = intlLocale(locale)
  if (value >= 1000) {
    return new Intl.NumberFormat(loc, { maximumFractionDigits: 2 }).format(value)
  }
  if (value >= 1) {
    return new Intl.NumberFormat(loc, { maximumFractionDigits: 4 }).format(value)
  }
  return new Intl.NumberFormat(loc, { maximumFractionDigits: 6 }).format(value)
}

export function formatTime(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}
