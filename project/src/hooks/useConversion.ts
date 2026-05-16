import { useQuery } from '@tanstack/react-query'
import { convertCurrency } from '../api/rates'
import type { ParsedConversion } from '../lib/parseConversion'

export function useConversion(parsed: ParsedConversion | null) {
  return useQuery({
    queryKey: ['convert', parsed?.amount, parsed?.from, parsed?.to],
    queryFn: () => convertCurrency(parsed!.amount, parsed!.from, parsed!.to),
    enabled: parsed !== null,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: (prev) => prev,
  })
}
