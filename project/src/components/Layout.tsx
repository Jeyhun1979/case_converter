import { NavLink, Outlet } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import { BaseCurrencySelect } from './BaseCurrencySelect'
import { Preferences } from './Preferences'

export function Layout() {
  const { t } = useI18n()

  return (
    <div className="app">
      <header className="header">
        <div className="header__top">
          <div className="header__brand">
            <span className="header__logo" aria-hidden="true">
              ◈
            </span>
            <h1 className="header__title">{t('app.title')}</h1>
          </div>
          <Preferences />
        </div>
        <div className="header__bottom">
          <nav className="nav" aria-label={t('nav.aria')}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav__link${isActive ? ' nav__link--active' : ''}`
              }
            >
              {t('nav.converter')}
            </NavLink>
            <NavLink
              to="/rates"
              className={({ isActive }) =>
                `nav__link${isActive ? ' nav__link--active' : ''}`
              }
            >
              {t('nav.rates')}
            </NavLink>
          </nav>
          <BaseCurrencySelect />
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        {t('footer.rates')}{' '}
        <a
          href="https://www.exchangerate-api.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Exchange Rate API
        </a>
      </footer>
    </div>
  )
}
