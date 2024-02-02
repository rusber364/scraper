import type { Song } from '../api/search-by-name.ts'

export function getPsalmsBySearching<T extends Record<string, Song>>(search: string, psalms: T) {
  const searchTitle = new RegExp(search, 'i')
  const ids = Object.keys(psalms) as (keyof T)[]
  const filteredIds = ids.filter((id) => searchTitle.test(psalms[id].title))

  return { list: filteredIds.map((id) => psalms[id]), ids: filteredIds }
}

export function getPsalmById(id: string, psalms: Record<string, Song>): Song | void {
  return psalms[id]
}
