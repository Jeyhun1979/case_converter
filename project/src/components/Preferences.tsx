import { useI18n } from '../context/I18nContext'
import { useTheme, type Theme } from '../context/ThemeContext'
import type { Locale } from '../i18n/translations'

export function Preferences() {
  const { locale, setLocale, t } = useI18n()
  const { theme, setTheme } = useTheme()

  return (
    <div className="prefs">
      <div className="segmented" role="group" aria-label={t('prefs.theme')}>
        {(['light', 'dark'] as Theme[]).map((value) => (
          <button
            key={value}
            type="button"
            className={`segmented__btn${theme === value ? ' segmented__btn--active' : ''}`}
            onClick={() => setTheme(value)}
            aria-pressed={theme === value}
          >
            {value === 'light' ? t('prefs.themeLight') : t('prefs.themeDark')}
          </button>
        ))}
      </div>
      <div className="segmented" role="group" aria-label={t('prefs.language')}>
        {(['ru', 'en'] as Locale[]).map((value) => (
          <button
            key={value}
            type="button"
            className={`segmented__btn${locale === value ? ' segmented__btn--active' : ''}`}
            onClick={() => setLocale(value)}
            aria-pressed={locale === value}
          >
            {value === 'ru' ? t('prefs.langRu') : t('prefs.langEn')}
          </button>
        ))}
      </div>
    </div>
  )
}
