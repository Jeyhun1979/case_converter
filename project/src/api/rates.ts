import { ApiError } from '../lib/apiError'

type LatestResponse = {
  result: string
  base_code: string
  time_last_update_utc: string
  rates: Record<string, number>
}

type FrankfurterResponse = {
  amount: number
  base: string
  date: string
  rates: Record<string, number>
}

export type RatesResponse = {
  base: string
  date: string
  rates: Record<string, number>
}

export type ConvertResponse = {
  amount: number
  from: string
  to: string
  rate: number
  result: number
  date: string
}

const OPEN_ER = import.meta.env.DEV
  ? '/api/fx'
  : 'https://open.er-api.com/v6'

const FRANKFURTER = import.meta.env.DEV
  ? '/api/frankfurter'
  : 'https://api.frankfurter.app'

const RUB = 'RUB'

function assertSuccess(result: string): void {
  if (result !== 'success') throw new ApiError('api.dataFailed')
}

function needsOpenEr(base: string): boolean {
  return base === RUB
}

async function fetchOpenErLatest(base: string): Promise<RatesResponse> {
  const res = await fetch(`${OPEN_ER}/latest/${encodeURIComponent(base)}`)
  if (!res.ok) throw new ApiError('api.ratesFailed')
  const data = (await res.json()) as LatestResponse
  assertSuccess(data.result)
  return {
    base: data.base_code,
    date: data.time_last_update_utc,
    rates: data.rates,
  }
}

async function fetchFrankfurterLatest(base: string): Promise<RatesResponse> {
  const res = await fetch(
    `${FRANKFURTER}/latest?from=${encodeURIComponent(base)}`,
  )
  if (!res.ok) throw new ApiError('api.ratesFailed')
  const data = (await res.json()) as FrankfurterResponse
  return {
    base: data.base,
    date: data.date,
    rates: data.rates,
  }
}

export async function fetchRates(base: string): Promise<RatesResponse> {
  if (needsOpenEr(base)) {
    return fetchOpenErLatest(base)
  }
  try {
    return await fetchFrankfurterLatest(base)
  } catch {
    return fetchOpenErLatest(base)
  }
}

export async function convertCurrency(
  amount: number,
  from: string,
  to: string,
): Promise<ConvertResponse> {
  const data = await fetchOpenErLatest(from)
  const rate = data.rates[to]
  if (rate === undefined) {
    throw new ApiError('api.rateUnavailable', { from, to })
  }
  return {
    amount,
    from,
    to,
    rate,
    result: amount * rate,
    date: data.date,
  }
}

export async function fetchCurrencies(): Promise<Record<string, string>> {
  const data = await fetchOpenErLatest('USD')
  const codes = Object.keys(data.rates)
  codes.push(data.base)
  return Object.fromEntries(codes.sort().map((code) => [code, code]))
}
