import type { Song, Config } from '../types.ts'
import { fetchSongTextById } from './fetchSongTextById.ts'
import { searchByName } from './searchByName.ts'

export async function fetchSongsTextBySearching(search: string, config: Config) {
  const searchSongs = await searchByName(search, config)
  const songs: Record<string, Song> = {}
  const listSongs: Promise<Song>[] = []

  searchSongs?.forEach(({ id }) => listSongs.push(fetchSongTextById(id, config)))

  for (let { id, title, lyrics } of await Promise.all(listSongs)) {
    songs[id] = { id, title, lyrics }
  }

  return songs
}
