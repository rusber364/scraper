import { sha256 } from './sha256.ts'

export function createId(nameSong: string, href = '') {
  const hash = sha256(nameSong)
  return `${hash}-${href}`.replaceAll('/', '+')
}

export function getHrefById(id: string) {
  return id.split('-')[1].replaceAll('+', '/')
}
