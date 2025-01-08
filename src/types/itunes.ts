  export interface ItunesSearchResult {
    resultCount: number
    results: ItunesItem[]
  }
  
  export interface ItunesItem {
    trackId: number
    collectionId: number
    artistName: string
    trackName: string
    artworkUrl100: string
    collectionName: string
    primaryGenreName: string
    trackViewUrl?: string
    collectionViewUrl? : string
    kind?: string
    wrapperType?: string
    previewUrl?: string
  }
  
  export type MediaType = 'all' | 'music' | 'movie' | 'podcast' | 'audiobook' | 'ebook'
  
  export const mediaTypeLabels: Record<MediaType, string> = {
    all: 'All Media',
    music: 'Music',
    movie: 'Movies',
    podcast: 'Podcasts',
    audiobook: 'Audiobooks',
    ebook: 'eBooks'
  }
  
  export const mediaTypeEntities: Record<MediaType, string> = {
    all: 'all',
    music: 'song,album,musicVideo',
    movie: 'movie',
    podcast: 'podcast',
    audiobook: 'audiobook',
    ebook: 'ebook'
  }
  
  