import { load } from 'cheerio'
import axios from 'axios'
import type { Songs } from '../../../types.ts'
import { baseURL } from '../config.ts'
import { md5 } from 'js-md5'

export async function searchByName(searchName: string, page = '') {
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
