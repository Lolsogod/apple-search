'use server'

import { ItunesSearchResult } from '../types/itunes'

export async function searchItunes(query: string): Promise<ItunesSearchResult> {
  if (!query) {
    return { resultCount: 0, results: [] }
  }

  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      query
    )}&limit=20&entity=song,album,podcast`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch data from iTunes')
  }

  const data = await response.json()
  return data as ItunesSearchResult
}

