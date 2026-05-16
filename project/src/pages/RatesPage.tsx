import { useMemo, useState } from 'react'
import { useBaseCurrency } from '../context/BaseCurrencyContext'
import { useI18n } from '../context/I18nContext'
import { useCurrencies, useRates } from '../hooks/useRates'
import { POPULAR } from '../lib/currencies'
import { getCurrencyName } from '../lib/currencyNames'
import { formatRate, formatTime } from '../lib/format'
import { resolveErrorMessage } from '../lib/resolveError'

type RateRow = {
  code: string
  name: string
  value: number
}

export function RatesPage() {
  const { base } = useBaseCurrency()
  const { locale, t } = useI18n()
  const { data, isLoading, isError, error, dataUpdatedAt, refetch, isFetching } =
    useRates(base)
  useCurrencies()
  const [filter, setFilter] = useState('')

  const rows = useMemo((): RateRow[] => {
    if (!data) return []
    const query = filter.trim().toUpperCase()
    return Object.entries(data.rates)
      .map(([code, ratePerBase]) => ({
        code,
        name: getCurrencyName(code, locale),
        value: 1 / ratePerBase,
      }))
      .filter(
        (row) =>
          !query ||
          row.code.includes(query) ||
          row.name.toUpperCase().includes(query),
      )
      .sort((a, b) => a.code.localeCompare(b.code))
  }, [data, filter, locale])

  const updatedLabel =
    dataUpdatedAt !== undefined ? formatTime(new Date(dataUpdatedAt), locale) : null

  return (
    <section className="panel rates">
      <div className="panel__head rates__head">
        <div>
          <h2 className="panel__title">{t('rates.title')}</h2>
          <p className="panel__hint">{t('rates.hint', { base })}</p>
        </div>
        <div className="rates__toolbar">
          <input
            type="search"
            className="rates__search"
            placeholder={t('rates.search')}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label={t('rates.searchAria')}
          />
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? t('rates.refreshing') : t('rates.refresh')}
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="rates__skeleton" aria-busy="true">
          {POPULAR.slice(0, 8).map((code) => (
            <div key={code} className="skeleton-row" />
          ))}
        </div>
      )}

      {isError && (
        <p className="rates__error" role="alert">
          {resolveErrorMessage(error, t, 'rates.errorLoad')}
        </p>
      )}

      {!isLoading && !isError && (
        <>
          <div className="rates__meta">
            {data?.date && (
              <span>{t('rates.source', { date: data.date })}</span>
            )}
            {updatedLabel && (
              <span>{t('rates.updated', { time: updatedLabel })}</span>
            )}
            <span>{t('rates.count', { count: rows.length })}</span>
          </div>
          <ul className="rates__list">
            {rows.map((row) => (
              <li key={row.code} className="rates__item">
                <div className="rates__item-main">
                  <span className="rates__code">{row.code}</span>
                  <span className="rates__name">{row.name}</span>
                </div>
                <span className="rates__value">
                  {t('rates.rateLine', {
                    code: row.code,
                    value: formatRate(row.value, locale),
                    base,
                  })}
                </span>
              </li>
            ))}
          </ul>
          {rows.length === 0 && (
            <p className="rates__empty">{t('rates.empty')}</p>
          )}
        </>
      )}
    </section>
  )
}
