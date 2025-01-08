import Image from 'next/image'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Music, Disc, Podcast, Film, Book, BookAudio } from 'lucide-react'
import type { ItunesItem } from '@/types/itunes'

function getItemIcon(kind?: string) {
  const iconClass = "h-4 w-4 min-h-4 min-w-4";

    switch (kind) {
      case 'song':
      case 'musicTrack':
        return <Music className={iconClass}/>
      case 'album':
        return <Disc className={iconClass}/>
      case 'podcast':
        return <Podcast className={iconClass}/>
      case 'feature-movie':
        return <Film className={iconClass}/>
      case 'ebook':
        return <Book className={iconClass}/>
      case 'audiobook':
        return <BookAudio className={iconClass}/>
      default:
        return <Music className={iconClass}/>
    }
  }

export default function ResultItem({data}: {data: ItunesItem}) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Image
              src={data.artworkUrl100}
              alt={data.trackName || data.collectionName}
              width={64}
              height={64}
              className="rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {getItemIcon(data.kind || data.wrapperType)}
                <p className="font-medium truncate">{data.trackName || data.collectionName}</p>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {data.artistName}
              </p>
              {data.collectionName && (
                <p className="text-sm text-muted-foreground truncate">
                  {data.collectionName}
                </p>
              )}
              <p className="text-sm text-muted-foreground truncate">
                {data.primaryGenreName}
              </p>
            </div>
            {(data.trackViewUrl || data.collectionViewUrl) && (
              <Button
                variant="outline"
                size="sm"
                className="ml-auto"
                onClick={() => window.open(data.trackViewUrl || data.collectionViewUrl, '_blank')}
              >
                View
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }