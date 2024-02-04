import Router from '@koa/router'
import { fetchSongTextById } from './api/fetch-song-text-by-id.ts'
import { searchByName } from './api/search-by-name.ts'
import type { Song } from '../../types.ts'

export const router = new Router({ prefix: '/holychords' })

router.get('/:search', async (ctx) => {
  ctx.body = await searchByName(ctx.params.search, ctx.query?.page)
})

router.get('/song/:id', async (ctx) => {
  ctx.body = await fetchSongTextById(ctx.params.id)
})

router.get('/text/:search', async (ctx) => {
  const searchSongs = await searchByName(ctx.params.search, ctx.query?.page)
  const songs: Record<string, Song> = {}
  const listSongs: Promise<Song>[] = []

  searchSongs.forEach(({ id }) => listSongs.push(fetchSongTextById(id)))

  for (let { id, title, lyrics } of await Promise.all(listSongs)) {
    songs[id] = {
      id,
      title,
      lyrics,
    }
  }

  ctx.body = songs
})

export default router
