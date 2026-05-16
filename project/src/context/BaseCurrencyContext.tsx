import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { detectBaseCurrencyFromLocale } from '../lib/detectBaseCurrency'
import { loadBaseCurrency, saveBaseCurrency } from '../lib/storage'

type BaseCurrencyContextValue = {
  base: string
  setBase: (code: string) => void
}

const BaseCurrencyContext = createContext<BaseCurrencyContextValue | null>(null)

export function BaseCurrencyProvider({ children }: { children: ReactNode }) {
  const [base, setBaseState] = useState(() =>
    loadBaseCurrency(detectBaseCurrencyFromLocale()),
  )

  const setBase = useCallback((code: string) => {
    setBaseState(code)
    saveBaseCurrency(code)
  }, [])

  const value = useMemo(() => ({ base, setBase }), [base, setBase])

  return (
    <BaseCurrencyContext.Provider value={value}>
      {children}
    </BaseCurrencyContext.Provider>
  )
}

export function useBaseCurrency(): BaseCurrencyContextValue {
  const ctx = useContext(BaseCurrencyContext)
  if (!ctx) throw new Error('useBaseCurrency must be used within provider')
  return ctx
}
