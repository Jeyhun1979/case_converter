import { ApiError } from './apiError'
import { isApiErrorCode } from './parseConversion'
import type { TranslationKey } from '../i18n/translations'

type TranslateFn = (
  key: TranslationKey,
  params?: Record<string, string | number>,
) => string

export function resolveErrorMessage(
  error: unknown,
  t: TranslateFn,
  fallback: TranslationKey,
): string {
  if (error instanceof ApiError) {
    return t(error.code, error.params)
  }
  if (error instanceof Error) {
    if (error.message === 'Failed to fetch') {
      return t('converter.errorNetwork')
    }
    if (isApiErrorCode(error.message)) {
      return t(error.message)
    }
  }
  return t(fallback)
}
