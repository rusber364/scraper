import axios from 'axios'
import { load } from 'cheerio'
import type { Song } from './search-by-name.ts'

export async function fetchSongTextById(id: string): Promise<Song> {
  try {
    const { data: html } = await axios.get(id)
    const $ = load(html)
    const title = $('.t-worship-leader__marquee__headline').text()
    const songElement = $('#music_text').text()
    let text = songElement.replace(/[A-Za-z].*\n/g, '').replace(/^\s+/gm, '')

    return { id, title, lyrics: text }
  } catch (err) {
    console.error(err)
    throw new Error('Not Found')
  }
}
