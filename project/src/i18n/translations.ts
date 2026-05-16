export type Locale = 'ru' | 'en'

export type TranslationKey =
  | 'app.title'
  | 'nav.converter'
  | 'nav.rates'
  | 'nav.aria'
  | 'prefs.theme'
  | 'prefs.themeLight'
  | 'prefs.themeDark'
  | 'prefs.language'
  | 'prefs.langRu'
  | 'prefs.langEn'
  | 'base.label'
  | 'base.aria'
  | 'footer.rates'
  | 'converter.title'
  | 'converter.hint'
  | 'converter.inputAria'
  | 'converter.examplesAria'
  | 'converter.calculating'
  | 'converter.errorGeneric'
  | 'converter.errorNetwork'
  | 'parse.empty'
  | 'parse.invalidAmount'
  | 'parse.unknownCurrency'
  | 'parse.sameCurrency'
  | 'parse.invalidFormat'
  | 'rates.title'
  | 'rates.hint'
  | 'rates.search'
  | 'rates.searchAria'
  | 'rates.refresh'
  | 'rates.refreshing'
  | 'rates.source'
  | 'rates.updated'
  | 'rates.count'
  | 'rates.rateLine'
  | 'rates.empty'
  | 'rates.errorLoad'
  | 'api.ratesFailed'
  | 'api.convertFailed'
  | 'api.dataFailed'
  | 'api.rateUnavailable'

const ru: Record<TranslationKey, string> = {
  'app.title': 'FX Converter',
  'nav.converter': 'Конвертер',
  'nav.rates': 'Курсы',
  'nav.aria': 'Основная навигация',
  'prefs.theme': 'Тема',
  'prefs.themeLight': 'Светлая',
  'prefs.themeDark': 'Тёмная',
  'prefs.language': 'Язык',
  'prefs.langRu': 'RU',
  'prefs.langEn': 'EN',
  'base.label': 'Базовая валюта',
  'base.aria': 'Базовая валюта',
  'footer.rates': 'Курсы:',
  'converter.title': 'Конвертер валют',
  'converter.hint': 'Введите запрос в свободной форме — например,',
  'converter.inputAria': 'Запрос на конвертацию',
  'converter.examplesAria': 'Примеры запросов',
  'converter.calculating': 'Считаем…',
  'converter.errorGeneric': 'Ошибка конвертации',
  'converter.errorNetwork':
    'Нет связи с сервером курсов. Проверьте интернет и обновите страницу.',
  'parse.empty': 'Введите запрос, например: 15 usd in rub',
  'parse.invalidAmount': 'Некорректная сумма',
  'parse.unknownCurrency': 'Неизвестная валюта: {code}',
  'parse.sameCurrency': 'Валюты должны отличаться',
  'parse.invalidFormat': 'Формат: 15 usd in rub или 100 eur to jpy',
  'rates.title': 'Курсы валют',
  'rates.hint': 'Относительно {base}: сколько {base} за 1 единицу валюты',
  'rates.search': 'Поиск валюты…',
  'rates.searchAria': 'Поиск валюты',
  'rates.refresh': 'Обновить',
  'rates.refreshing': 'Обновление…',
  'rates.source': 'Источник: {date}',
  'rates.updated': 'Обновлено: {time}',
  'rates.count': '{count} валют',
  'rates.rateLine': '1 {code} = {value} {base}',
  'rates.empty': 'Ничего не найдено',
  'rates.errorLoad': 'Ошибка загрузки',
  'api.ratesFailed': 'Не удалось загрузить курсы',
  'api.convertFailed': 'Не удалось выполнить конвертацию',
  'api.dataFailed': 'Не удалось получить данные',
  'api.rateUnavailable': 'Курс {from} → {to} недоступен',
}

const en: Record<TranslationKey, string> = {
  'app.title': 'FX Converter',
  'nav.converter': 'Converter',
  'nav.rates': 'Rates',
  'nav.aria': 'Main navigation',
  'prefs.theme': 'Theme',
  'prefs.themeLight': 'Light',
  'prefs.themeDark': 'Dark',
  'prefs.language': 'Language',
  'prefs.langRu': 'RU',
  'prefs.langEn': 'EN',
  'base.label': 'Base currency',
  'base.aria': 'Base currency',
  'footer.rates': 'Rates:',
  'converter.title': 'Currency converter',
  'converter.hint': 'Enter a free-form query — for example,',
  'converter.inputAria': 'Conversion query',
  'converter.examplesAria': 'Example queries',
  'converter.calculating': 'Calculating…',
  'converter.errorGeneric': 'Conversion error',
  'converter.errorNetwork':
    'Cannot reach the rates server. Check your connection and refresh.',
  'parse.empty': 'Enter a query, e.g. 15 usd in rub',
  'parse.invalidAmount': 'Invalid amount',
  'parse.unknownCurrency': 'Unknown currency: {code}',
  'parse.sameCurrency': 'Currencies must differ',
  'parse.invalidFormat': 'Format: 15 usd in rub or 100 eur to jpy',
  'rates.title': 'Exchange rates',
  'rates.hint': 'Relative to {base}: how much {base} per 1 unit',
  'rates.search': 'Search currency…',
  'rates.searchAria': 'Search currency',
  'rates.refresh': 'Refresh',
  'rates.refreshing': 'Refreshing…',
  'rates.source': 'Source: {date}',
  'rates.updated': 'Updated: {time}',
  'rates.count': '{count} currencies',
  'rates.rateLine': '1 {code} = {value} {base}',
  'rates.empty': 'Nothing found',
  'rates.errorLoad': 'Failed to load',
  'api.ratesFailed': 'Failed to load rates',
  'api.convertFailed': 'Conversion failed',
  'api.dataFailed': 'Failed to fetch data',
  'api.rateUnavailable': 'Rate {from} → {to} unavailable',
}

export const messages: Record<Locale, Record<TranslationKey, string>> = {
  ru,
  en,
}

export function translate(
  locale: Locale,
  key: TranslationKey,
  params?: Record<string, string | number>,
): string {
  let text = messages[locale][key]
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, String(v))
    }
  }
  return text
}

export function detectLocale(): Locale {
  const stored = localStorage.getItem('fx-locale')
  if (stored === 'ru' || stored === 'en') return stored
  const lang = navigator.language.toLowerCase()
  return lang.startsWith('ru') ? 'ru' : 'en'
}
