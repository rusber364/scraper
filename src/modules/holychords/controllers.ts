import Router from '@koa/router'
import { searchByName } from '../../api/searchByName.ts'
import { fetchSongTextById } from '../../api/fetchSongTextById.ts'
import { fetchSongsTextBySearching } from '../../api/fetchSongsTextBySearching.ts'
import { config } from './config.ts'

export const router = new Router({ prefix: '/holychords' })

router.get('/:search', async (ctx) => {
  ctx.body = await searchByName(ctx.params.search, config, ctx.query?.page)
})

router.get('/song/:id', async (ctx) => {
  ctx.body = await fetchSongTextById(ctx.params.id, config)
})

router.get('/text/:search', async (ctx) => {
  ctx.body = await fetchSongsTextBySearching(ctx.params.search, config, ctx.query?.page)
})

export default router
