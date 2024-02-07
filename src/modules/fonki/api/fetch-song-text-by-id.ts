import axios from 'axios'
import { Song } from '../../../types.ts'
import { baseURL } from '../config.ts'
import { getHrefById } from '../../../utils/id.ts'
import { getModelFromHtml } from '../../../utils/getModelFromHtml.ts'

export async function fetchSongTextById(id: string): Promise<Song> {
  try {
    const href = getHrefById(id)
    const { data: html } = await axios.get(href, { baseURL })

    const { title, lyrics } = getModelFromHtml(html, '.entry-title.text-truncate', '#texts')

    return { id, title, lyrics }
  } catch (err) {
    console.error(err)
    throw new Error('Not Found')
  }
}
