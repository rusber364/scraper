import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { md5 } from 'js-md5'
import type { Song } from '../api/search-by-name.ts'
import { lineCapitalized } from './capitalize.ts'

try {
  const [fileName] = process.argv.slice(2)
  const currentFile = path.resolve(process.cwd(), fileName)
  const songs = await fs.readFile(currentFile)
  const newPathFile = currentFile.replace('.sog', '.json')
  const parsedSongs: Record<string, Song> = {}

  songs
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

  fs.writeFile(newPathFile, JSON.stringify(parsedSongs, null, 2))
} catch (error) {
  console.error(error)
  throw new Error((error as Error).message)
}
