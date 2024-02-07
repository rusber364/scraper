import Router from '@koa/router'

import psalms from '@/all.json'
import { Song } from '~/types.ts'

import { getPsalmById, getPsalmsBySearching } from './utils/get-psalms.ts'

export const router = new Router({ prefix: '/psalms' })

router.get('/:search', async (ctx) => {
  ctx.body = getPsalmsBySearching(ctx.params.search, psalms as Record<string, Song>).list
})

router.get('/song/:id', async (ctx) => {
  ctx.body = getPsalmById(ctx.params.id, psalms as Record<string, Song>)
})
