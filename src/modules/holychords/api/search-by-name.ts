import { load } from 'cheerio'
import axios from 'axios'
import type { Songs } from '../../../types.ts'
import { config } from '../config.ts'
import { createId } from '../../../utils/id.ts'

export async function searchByName(searchName: string, page?: string | string[]) {
  const songs: Songs = []

  try {
    const url = `/search?name=${searchName}`
    const { data: html } = await axios.get<string>(url, {
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      baseURL: config.baseURL,
      params: { page },
    })
    const $ = load(html)
    const songsElements = $('#entries').children()

    songsElements.each((_, element) => {
      const songElement = $(element).find('.media-body.text-truncate a')
      const nameSong = songElement.text().trim()
      const id = createId(nameSong, songElement.attr('href'))

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
