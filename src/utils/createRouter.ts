import Router from '@koa/router'
import { fetchSongTextById } from '../api/fetchSongTextById.ts'
import { fetchSongsTextBySearching } from '../api/fetchSongsTextBySearching.ts'
import { searchByName } from '../api/searchByName.ts'
import type { Config } from '../types.ts'

export function createRouter(config: Config) {
  const router = new Router({ prefix: config.routePrefix })

  router.get('/:search', async (ctx) => {
    ctx.body = await searchByName(ctx.params.search, config)
  })

  router.get('/song/:id', async (ctx) => {
    ctx.body = await fetchSongTextById(ctx.params.id, config)
  })

  router.get('/text/:search', async (ctx) => {
    ctx.body = await fetchSongsTextBySearching(ctx.params.search, config)
  })

  return router
}
