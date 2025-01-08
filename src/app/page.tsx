'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Music, Disc, Podcast } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { searchItunes } from '@/actions/search'
import { SearchSkeleton } from '@/components/search-skeleton'
import { ItunesItem } from '@/types/itunes'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ItunesItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const data = await searchItunes(query)
      setResults(data.results.filter((item) => !!item.trackId)) // Filter out without id fix later
    } catch {
      setError('Failed to fetch results. Please try again.')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  function getItemIcon(kind?: string) {
    switch (kind) {
      case 'song':
        return <Music className="h-4 w-4" />
      case 'album':
        return <Disc className="h-4 w-4" />
      case 'podcast':
        return <Podcast className="h-4 w-4" />
      default:
        return <Music className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-center">iTunes Search</h1>
          <p className="text-muted-foreground text-center">
            Search for songs, albums, and podcasts
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="search"
            placeholder="Search iTunes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            Search
          </Button>
        </form>

        {error && (
          <Card>
            <CardContent className="p-4">
              <p className="text-red-500">{error}</p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {isLoading ? (
            <SearchSkeleton />
          ) : results.length > 0 ? (
            <div className="grid gap-4">
              {results.map((item) => (
                <Card key={item.trackId}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Image
                        src={item.artworkUrl100}
                        alt={item.trackName}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {getItemIcon(item.kind)}
                          <p className="font-medium truncate">{item.trackName}</p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {item.artistName}
                        </p>
                        {item.collectionName && (
                          <p className="text-sm text-muted-foreground truncate">
                            {item.collectionName}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {item.primaryGenreName}
                        </p>
                      </div>
                      {item.trackViewUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-auto"
                          onClick={() => window.open(item.trackViewUrl, '_blank')}
                        >
                          View
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : query && !isLoading ? (
            <Card>
              <CardContent className="p-4 text-center text-muted-foreground">
                No results found for &quot;{query}&quot;
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  )
}

