import axios from 'axios'
import type { Config } from '../types.ts'
import { getSongListFromHtml } from '../utils/getSongListFromHtml.ts'

export async function searchByName(search: string, config: Config) {
  try {
    const { baseURL, searching } = config
    const { songsSelector, songSelector, urlKey, page } = searching
    const [searchName, defaultPage = ''] = search.split('^')
    const url = `/search/${page.query ? '' : defaultPage}?${urlKey}=${searchName}`

    const { data: html } = await axios.get<string>(url, {
      baseURL,
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      params: { page: page.query ? defaultPage : '' },
    })

    return getSongListFromHtml(html, songsSelector, songSelector)
  } catch (err) {
    console.error(err)
    throw new Error('Songs not found')
  }
}
