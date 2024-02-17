import { Hono } from 'hono'

import psalms from '@/all.json'
import { Song } from '~/types.ts'

import { getPsalmById, getPsalmsBySearching } from './utils/get-psalms.ts'

export const router = new Hono()

router.get('/:search', async (ctx) => {
  const searchParam = ctx.req.param().search
  return ctx.json(getPsalmsBySearching(searchParam, psalms as Record<string, Song>).list)
})

router.get('/song/:id', async (ctx) => {
  const idParam = ctx.req.param().id
  return ctx.json(getPsalmById(idParam, psalms as Record<string, Song>) ?? {})
})
