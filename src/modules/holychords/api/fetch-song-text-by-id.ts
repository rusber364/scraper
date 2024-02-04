import axios from 'axios'
import { load } from 'cheerio'
import { Song } from '../../../types.ts'
import { baseURL } from '../config.ts'

export async function fetchSongTextById(id: string): Promise<Song> {
  try {
    const { data: html } = await axios.get(id, { baseURL })
    const $ = load(html)
    const title = $('.t-worship-leader__marquee__headline').text().replace(/^\s+/gm, '')
    const songElement = $('#music_text').text()
    const text = songElement.replace(/[A-Za-z].*\n/g, '').replace(/^\s+/gm, '')

    return { id, title, lyrics: text }
  } catch (err) {
    console.error(err)
    throw new Error('Not Found')
  }
}
