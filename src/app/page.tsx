'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { searchItunes } from '@/actions/search'
import { SearchSkeleton } from '@/components/search-skeleton'
import { ItunesItem, MediaType, mediaTypeLabels } from '@/types/itunes'
import ResultItem from '@/components/result-item'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [mediaType, setMediaType] = useState<MediaType>('all')
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<ItunesItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return

    setHasSearched(true);
    setIsLoading(true)
    setError(null)

    try {
      const data = await searchItunes(query, mediaType)
      setResults(data.results)
    } catch {
      setError('Failed to fetch results. Please try again.')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  function renderError() {
    if (!error) {
      return null
    }

    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    )
  }

  function renderSearchResults() {
    if (!hasSearched) {
      return null;
    }

    if (isLoading) {
      return <SearchSkeleton />;
    }

    if (results.length === 0) {
      return (
        <Card>
          <CardContent className="p-4 text-center text-muted-foreground">
            No results found for &quot;{query}&quot;
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid gap-4">
        {results.map((item) => <ResultItem data={item} key={item.trackId || item.collectionId} />)}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-center">iTunes Search</h1>
          <p className="text-muted-foreground text-center">
            Search for music, movies, podcasts, books, and more
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex gap-2">
            <Input
              type="search"
              placeholder="Search iTunes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Select
              value={mediaType}
              onValueChange={(value) => setMediaType(value as MediaType)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(mediaTypeLabels) as MediaType[]).map((type) => (
                  <SelectItem key={type} value={type}>
                    {mediaTypeLabels[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" disabled={isLoading}>
              Search
            </Button>
          </div>
        </form>

        {renderError()}

        <div className="space-y-4">
          {renderSearchResults()}
        </div>
      </div>
    </div>
  )
}

