import axios from 'axios'
import type { Songs } from '../../../types.ts'
import { config } from '../config.ts'
import { getSongListFromHtml } from '../../../utils/getSongListFromHtml.ts'

export async function searchByName(searchName: string, page?: string | string[]) {
  try {
    const url = `/search?name=${searchName}`
    const { data: html } = await axios.get<string>(url, {
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      baseURL: config.baseURL,
      params: { page },
    })

    return getSongListFromHtml(html, '#entries', '.media-body.text-truncate a')
  } catch (err) {
    console.error(err)
  }
}
