import './config.ts'
import { fetchSongTextById } from './fetch-song-text-by-id.ts'
import { searchByName, type Song } from './search-by-name.ts'
import Koa from 'koa'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()

router.get('/:search', async (ctx) => {
  ctx.body = await searchByName(ctx.params.search)
})

router.get('/text/:search', async (ctx) => {
  const searchSongs = await searchByName(ctx.params.search)
  const songs: Record<string, Song> = {}

  for await (let { id, title } of await Promise.all(searchSongs)) {
    const { lyrics } = await fetchSongTextById(id)

    songs[id] = {
      id,
      title,
      lyrics,
    }
  }

  ctx.body = songs
})

router.get('/song/:id', async (ctx) => {
  const song: Song = await fetchSongTextById(`/${ctx.params.id}`)

  ctx.body = song
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => console.log('The server is running on port 3000'))
