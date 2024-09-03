import { Hono } from 'hono'

import psalms from '@/all.json'
import type { Song } from '~/types.ts'

import { getPsalmById, getPsalmsBySearching } from './utils/get-psalms.ts'

export const router = new Hono()

router.get('/:search', async (ctx) => {
  const searchParam = ctx.req.param().search
  const songs = getPsalmsBySearching(searchParam, psalms as Record<string, Song>).list

  return ctx.json(songs)
})

router.get('/song/:id', async (ctx) => {
  const idParam = ctx.req.param().id
  const song = getPsalmById(idParam, psalms as Record<string, Song>)

  return ctx.json(song ?? {})
})
