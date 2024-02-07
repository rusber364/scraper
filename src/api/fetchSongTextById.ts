import axios from 'axios'
import type { Song, SongOption } from '../types.ts'
import { getModelFromHtml } from '../utils/getModelFromHtml.ts'
import { getHrefById } from '../utils/id.ts'

export async function fetchSongTextById(id: string, options: SongOption): Promise<Song> {
  try {
    const href = getHrefById(id)
    const { baseURL, titleSelector, textSelector } = options
    const { data: html } = await axios.get(href, { baseURL })
    const { title, lyrics } = getModelFromHtml(html, titleSelector, textSelector)

    return { id, title, lyrics }
  } catch (err) {
    console.error(err)
    throw new Error('Song not Found')
  }
}
