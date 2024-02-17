import { Hono } from 'hono'

import { fetchSongsTextBySearching } from '~/api/fetchSongsTextBySearching.ts'
import { fetchSongTextById } from '~/api/fetchSongTextById.ts'
import { searchByName } from '~/api/searchByName.ts'
import type { Config } from '~/types.ts'

export function createRouter(config: Config) {
  const router = new Hono()

  router.get('/:search', async (ctx) => {
    const searchParam = ctx.req.param().search
    return ctx.json(await searchByName(searchParam, config))
  })

  router.get('/song/:id', async (ctx) => {
    const idParam = ctx.req.param().id
    return ctx.json(await fetchSongTextById(idParam, config))
  })

  router.get('/text/:search', async (ctx) => {
    const searchParam = ctx.req.param().search
    return ctx.json(await fetchSongsTextBySearching(searchParam, config))
  })

  return router
}
