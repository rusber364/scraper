import { load } from 'cheerio'

import type { Songs } from '~/types.ts'

import { createId } from './id.ts'

export function getSongListFromHtml(html: string, songsSelector: string, songSelector: string) {
  const $ = load(html)
  const songsElements = $(songsSelector).children()
  const songs: Songs = []

  songsElements.each((_, element) => {
    const songElement = $(element).find(songSelector)
    const title = songElement.text().trim()
    const id = createId(title, songElement.attr('href'))

    if (id && title.length) {
      songs.push({ id, title })
    }
  })

  return songs
}
