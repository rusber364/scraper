import Router from '@koa/router'
import { searchByName } from './api/search-by-name.ts'
import { fetchSongTextById } from './api/fetch-song-text-by-id.ts'

export const router = new Router({ prefix: '/fonki' })

router.get('/:search', async (ctx) => {
  ctx.body = await searchByName(ctx.params.search, ctx.query.page as string)
})

router.get('/song/:id', async (ctx) => {
  ctx.body = await fetchSongTextById(ctx.params.id)
})
