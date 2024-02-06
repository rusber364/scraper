import Router from '@koa/router'
import type { Song, Songs } from '../../types.ts'
import { load } from 'cheerio'
import axios from 'axios'
import { md5 } from 'js-md5'

export const router = new Router({ prefix: '/fonki' })

type Option = {
  baseURL: string
  selectorTitle: string
  selectorText: string
  selectorSearch: string
}

const baseURL = 'https://fonki.pro'

router.get('/:search', async (ctx) => {
  async function searchByName(searchName: string, page = '') {
    const songs: Songs = []

    try {
      const url = `/search/${page}?q=${searchName}`
      const { data: html } = await axios.get<string>(url, {
        headers: { 'Content-Type': 'text/html; charset=UTF-8' },
        baseURL,
      })
      const $ = load(html)
      const songsElements = $('#data_list').children()

      songsElements.each((_, element) => {
        const songElement = $(element).find('.media-body.text-truncate a')
        const nameSong = songElement.text().trim()
        const id = songElement.attr('href')?.replace('/minus/', '').concat('-').concat(md5(nameSong))

        if (id && nameSong.length) {
          songs.push({ id, title: nameSong })
        }
      })
    } catch (err) {
      console.error(err)
    } finally {
      return songs
    }
  }

  ctx.body = await searchByName(ctx.params.search, ctx.query.page as string)
})

router.get('/song/:id', async (ctx) => {
  async function fetchSongTextById(id: string): Promise<Song> {
    try {
      const { data: html } = await axios.get('/minus/' + id.split('-')[0], { baseURL })
      const $ = load(html)
      const title = $('.entry-title.text-truncate').text().replace(/^\s+/gm, '')
      const songElement = $('#texts').text()
      const text = songElement.replace(/[A-Za-z].*\n/g, '').replace(/^\s+/gm, '')

      return { id, title, lyrics: text }
    } catch (err) {
      console.error(err)
      throw new Error('Not Found')
    }
  }

  ctx.body = await fetchSongTextById(ctx.params.id)
})
