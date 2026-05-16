import type { TranslationKey } from '../i18n/translations'

export class ApiError extends Error {
  readonly code: TranslationKey
  readonly params?: Record<string, string | number>

  constructor(
    code: TranslationKey,
    params?: Record<string, string | number>,
  ) {
    super(code)
    this.name = 'ApiError'
    this.code = code
    this.params = params
  }
}
