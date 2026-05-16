import { useBaseCurrency } from '../context/BaseCurrencyContext'
import { useI18n } from '../context/I18nContext'
import { useCurrencies } from '../hooks/useRates'
import { POPULAR } from '../lib/currencies'
import { getCurrencyName } from '../lib/currencyNames'

export function BaseCurrencySelect() {
  const { base, setBase } = useBaseCurrency()
  const { locale, t } = useI18n()
  const { data: currencies } = useCurrencies()

  const options = currencies
    ? Object.keys(currencies).sort()
    : [...POPULAR]

  return (
    <label className="base-select">
      <span className="base-select__label">{t('base.label')}</span>
      <select
        className="base-select__input"
        value={base}
        onChange={(e) => setBase(e.target.value)}
        aria-label={t('base.aria')}
      >
        {options.map((code) => (
          <option key={code} value={code}>
            {code} — {getCurrencyName(code, locale)}
          </option>
        ))}
      </select>
    </label>
  )
}
