import { useQuery } from '@tanstack/react-query'
import { fetchCurrencies, fetchRates } from '../api/rates'

export function useRates(base: string) {
  return useQuery({
    queryKey: ['rates', base],
    queryFn: () => fetchRates(base),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
}

export function useCurrencies() {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: fetchCurrencies,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  })
}
