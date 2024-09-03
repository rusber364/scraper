import { Hono } from 'hono'
import { fetchSongTextById } from '~/api/fetchSongTextById.ts'
import { fetchSongsTextBySearching } from '~/api/fetchSongsTextBySearching.ts'
import { searchByName } from '~/api/searchByName.ts'
import type { Config } from '~/types.ts'

export function createRouter(config: Config) {
  const router = new Hono()

  router.get('/:search', async (ctx) => {
    const searchParam = ctx.req.param().search
    const songs = await searchByName(searchParam, config)

    return ctx.json(songs)
  })

  router.get('/song/:id', async (ctx) => {
    const idParam = ctx.req.param().id
    const song = await fetchSongTextById(idParam, config)

    return ctx.json(song)
  })

  router.get('/text/:search', async (ctx) => {
    const searchParam = ctx.req.param().search
    const songs = await fetchSongsTextBySearching(searchParam, config)

    return ctx.json(songs)
  })

  return router
}
