import axios from 'axios'
import { load } from 'cheerio'
import { Song } from '../../../types.ts'
import { baseURL } from '../config.ts'

export async function fetchSongTextById(id: string): Promise<Song> {
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
