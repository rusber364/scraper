import { load } from 'cheerio'
import axios from 'axios'

export type Song = {
  id: string
  title: string
  artist?: string
  author?: string
  lyrics?: string
}

type Songs = Song[]

export async function searchByName(searchName: string, page?: string | string[]) {
  const songs: Songs = []

  try {
    const url = `/search?name=${searchName}`
    const { data: html } = await axios.get<string>(url, {
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      params: { page },
    })
    const $ = load(html)
    const songsElements = $('#entries').children()

    songsElements.each((_, element) => {
      const songElement = $(element).find('.media-body.text-truncate a')
      const id = songElement.attr('href')?.replace('/', '')
      const nameSong = songElement.text().trim()

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
