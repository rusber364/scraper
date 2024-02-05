import { md5 } from 'js-md5'
import type { Song } from '../../types.ts'
import { lineCapitalized } from './capitalize.ts'

export function parsePsalms(psalms: Buffer) {
  const parsedSongs: Record<string, Song> = {}

  psalms
    .toString('utf8')
    .toLowerCase()
    .split('\r\n\r\n')
    .forEach((song, idx) => {
      const songLines = song.split('\r\n')
      const [_, title] = songLines.splice(0, 2)
      const id = md5(`${title}-${idx + 100_000}`)

      parsedSongs[id] = {
        id,
        title: lineCapitalized(title),
        lyrics: songLines.map(lineCapitalized).join('\n'),
      }
    })

  return parsedSongs
}
