import Image from 'next/image'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Music, Disc, Podcast, Film, Book, Bookmark } from 'lucide-react'
import type { ItunesItem } from '@/types/itunes'

function getItemIcon(kind?: string) {
    switch (kind) {
      case 'song':
      case 'musicTrack':
        return <Music className="h-4 w-4" />
      case 'album':
        return <Disc className="h-4 w-4" />
      case 'podcast':
        return <Podcast className="h-4 w-4" />
      case 'movie':
        return <Film className="h-4 w-4" />
      case 'ebook':
        return <Book className="h-4 w-4" />
      case 'audiobook':
        return <Bookmark className="h-4 w-4" />
      default:
        return <Music className="h-4 w-4" />
    }
  }

export default function ResultItem({data}: {data: ItunesItem}) {
    return (
      <Card key={data.trackId}>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Image
              src={data.artworkUrl100}
              alt={data.trackName}
              width={64}
              height={64}
              className="rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {getItemIcon(data.kind)}
                <p className="font-medium truncate">{data.trackName}</p>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {data.artistName}
              </p>
              {data.collectionName && (
                <p className="text-sm text-muted-foreground truncate">
                  {data.collectionName}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                {data.primaryGenreName}
              </p>
            </div>
            {data.trackViewUrl && (
              <Button
                variant="outline"
                size="sm"
                className="ml-auto"
                onClick={() => window.open(data.trackViewUrl, '_blank')}
              >
                View
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }