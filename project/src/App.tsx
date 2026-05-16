import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BaseCurrencyProvider } from './context/BaseCurrencyContext'

const ConverterPage = lazy(() =>
  import('./pages/ConverterPage').then((m) => ({ default: m.ConverterPage })),
)
const RatesPage = lazy(() =>
  import('./pages/RatesPage').then((m) => ({ default: m.RatesPage })),
)

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

function PageFallback() {
  return <div className="page-loading" aria-busy="true" />
}

export default function App() {
  return (
    <BaseCurrencyProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<PageFallback />}>
                  <ConverterPage />
                </Suspense>
              }
            />
            <Route
              path="rates"
              element={
                <Suspense fallback={<PageFallback />}>
                  <RatesPage />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BaseCurrencyProvider>
  )
}
