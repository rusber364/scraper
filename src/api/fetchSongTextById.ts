import axios from 'axios'

import type { Config, Song } from '~/types.ts'
import { getModelFromHtml } from '~/utils/getModelFromHtml.ts'
import { getHrefById } from '~/utils/id.ts'

export async function fetchSongTextById(id: string, options: Config): Promise<Song> {
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
