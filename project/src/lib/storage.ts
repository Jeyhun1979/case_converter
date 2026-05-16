const BASE_KEY = 'fx-base-currency'

export function loadBaseCurrency(fallback: string): string {
  try {
    const stored = localStorage.getItem(BASE_KEY)
    if (stored && /^[A-Z]{3}$/.test(stored)) return stored
  } catch {
    return fallback
  }
  return fallback
}

export function saveBaseCurrency(code: string): void {
  try {
    localStorage.setItem(BASE_KEY, code)
  } catch {
    return
  }
}
