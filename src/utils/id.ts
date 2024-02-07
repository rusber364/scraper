import { md5 } from 'js-md5'

export function createId(nameSong: string, href = '') {
  return `${md5(nameSong)}-${href}`.replaceAll('/', '+')
}

export function getHrefById(id: string) {
  return id.split('-')[1].replaceAll('+', '/')
}
