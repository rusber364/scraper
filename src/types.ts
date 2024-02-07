export type Song = {
  id: string
  title: string
  artist?: string
  author?: string
  lyrics?: string
}

export type Songs = Song[]

export type SongOption = {
  baseURL: string
  titleSelector: string
  textSelector: string
  searching: {
    urlKey: string
    songsSelector: string
    songSelector: string
    page: {
      query: boolean
    }
  }
}
