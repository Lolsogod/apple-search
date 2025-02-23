'use server'

import { ItunesSearchResult, MediaType, mediaTypeEntities } from '../types/itunes'

export async function searchItunes(
  query: string, 
  mediaType: MediaType = 'all',
  page: number = 1,
  limit: number = 10
): Promise<ItunesSearchResult> {
  if (!query) {
    return { resultCount: 0, results: [] }
  }

  const offset = (page - 1) * limit
  const entity = mediaTypeEntities[mediaType]
  const entityParam = mediaType === 'all' ? '' : `&entity=${entity}`

  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      query
    )}&limit=${limit}&offset=${offset}${entityParam}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch data from iTunes')
  }

  const data = await response.json()
  return data as ItunesSearchResult
}
