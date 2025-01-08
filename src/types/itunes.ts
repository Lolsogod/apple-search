export interface ItunesSearchResult {
    resultCount: number
    results: ItunesItem[]
  }
  
  export interface ItunesItem {
    trackId: number
    artistName: string
    trackName: string
    artworkUrl100: string
    collectionName?: string
    primaryGenreName: string
    trackViewUrl?: string
    kind?: string
    previewUrl?: string
  }
  
  