import type { Locale } from '../i18n/translations'

const cache = new Map<string, Intl.DisplayNames>()

function getDisplayNames(locale: Locale): Intl.DisplayNames | null {
  const key = locale
  const cached = cache.get(key)
  if (cached) return cached
  try {
    const names = new Intl.DisplayNames([locale === 'ru' ? 'ru-RU' : 'en-US'], {
      type: 'currency',
    })
    cache.set(key, names)
    return names
  } catch {
    return null
  }
}

export function getCurrencyName(code: string, locale: Locale): string {
  return getDisplayNames(locale)?.of(code) ?? code
}
