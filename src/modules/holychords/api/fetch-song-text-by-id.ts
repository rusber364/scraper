import axios from 'axios'
import { load } from 'cheerio'
import { Song } from '../../../types.ts'
import { baseURL } from '../config.ts'
import { getHrefById } from '../../../utils/id.ts'
import { cleanLine } from '../../../utils/cleanLine.ts'

export async function fetchSongTextById(id: string): Promise<Song> {
  try {
    const href = getHrefById(id)
    const { data: html } = await axios.get(href, { baseURL })

    const $ = load(html)
    const titleText = $('h2.t-worship-leader__marquee__headline.mb-0').text()
    const songText = $('#music_text').text()

    const title = cleanLine(titleText)
    const lyrics = cleanLine(songText)

    return { id, title, lyrics }
  } catch (err) {
    console.error(err)
    throw new Error('Not Found')
  }
}
