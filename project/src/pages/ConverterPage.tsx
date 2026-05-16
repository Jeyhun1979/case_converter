import { useMemo, useState } from 'react'
import { useI18n } from '../context/I18nContext'
import { useConversion } from '../hooks/useConversion'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { formatAmount } from '../lib/format'
import { parseConversionInput } from '../lib/parseConversion'
import { resolveErrorMessage } from '../lib/resolveError'

const EXAMPLES = ['15 usd in rub', '100 eur to jpy', '42 gbp in usd']

export function ConverterPage() {
  const { locale, t } = useI18n()
  const [input, setInput] = useState('')
  const debounced = useDebouncedValue(input, 350)

  const parsed = useMemo(() => {
    const result = parseConversionInput(debounced)
    return result.ok ? result.value : null
  }, [debounced])

  const parseError = useMemo(() => {
    if (!debounced.trim()) return null
    const result = parseConversionInput(debounced)
    return result.ok ? null : t(result.code, result.params)
  }, [debounced, t])

  const { data, isFetching, isError, error } = useConversion(parsed)

  const resultAmount = parsed && data ? data.result : null

  return (
    <section className="panel converter">
      <div className="panel__head">
        <h2 className="panel__title">{t('converter.title')}</h2>
        <p className="panel__hint">
          {t('converter.hint')} <code>15 usd in rub</code>
        </p>
      </div>

      <div className="converter__input-wrap">
        <input
          type="text"
          className="converter__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="15 usd in rub"
          spellCheck={false}
          autoComplete="off"
          aria-label={t('converter.inputAria')}
          aria-describedby="converter-result"
        />
        {isFetching && parsed && (
          <span className="converter__spinner" aria-hidden="true" />
        )}
      </div>

      <div className="converter__examples" aria-label={t('converter.examplesAria')}>
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            className="chip"
            onClick={() => setInput(example)}
          >
            {example}
          </button>
        ))}
      </div>

      <div
        id="converter-result"
        className={`converter__result${resultAmount !== null ? ' converter__result--success' : ''}${parseError ? ' converter__result--error' : ''}`}
        role="status"
        aria-live="polite"
      >
        {parseError && <p className="converter__message">{parseError}</p>}
        {isError && (
          <p className="converter__message">
            {resolveErrorMessage(error, t, 'converter.errorGeneric')}
          </p>
        )}
        {resultAmount !== null && parsed && (
          <p className="converter__answer">
            <span className="converter__answer-label">
              {formatAmount(parsed.amount, parsed.from, locale)}
            </span>
            <span className="converter__arrow" aria-hidden="true">
              →
            </span>
            <strong className="converter__answer-value">
              {formatAmount(resultAmount, parsed.to, locale)}
            </strong>
          </p>
        )}
        {!parseError &&
          !isError &&
          resultAmount === null &&
          debounced.trim() &&
          parsed &&
          isFetching && (
            <p className="converter__message converter__message--muted">
              {t('converter.calculating')}
            </p>
          )}
      </div>
    </section>
  )
}
