import Router from '@koa/router'
import { fetchSongTextById } from './api/fetch-song-text-by-id.ts'
import { searchByName, type Song } from './api/search-by-name.ts'
import psalms from '../psalms/Загальний спів.json'

export const router = new Router()

router.get('/:search', async (ctx) => {
  ctx.body = await searchByName(ctx.params.search, ctx.query?.page)
})

router.get('/song/:id', async (ctx) => {
  ctx.body = await fetchSongTextById(ctx.params.id)
})

router.get('/psalms/:search', async (ctx) => {
  const searchTitle = new RegExp(ctx.params.search, 'i')
  const filteredIds = Object.keys(psalms).filter((id) => {
    // @ts-ignore
    return searchTitle.test(psalms[id].title)
  })

  ctx.body = filteredIds.map((id) => {
    // @ts-ignore
    return psalms[id]
  })
})

router.get('/psalms/song/:id', async (ctx) => {
  // @ts-ignore
  ctx.body = psalms[ctx.params.id]
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
