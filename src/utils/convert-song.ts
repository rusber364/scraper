import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { md5 } from 'js-md5'
import type { Song } from '../api/search-by-name.ts'

try {
  const [fileName] = process.argv.slice(2)
  const currentFile = path.resolve(process.cwd(), fileName)
  const songs = await fs.readFile(currentFile)
  const newPathFile = currentFile.replace('.sog', '.json')
  const { name: nameFile } = path.parse(currentFile)
  const parsedSongs: Record<string, Song> = {}

  songs
    .toString('utf8')
    .split('\r\n\r\n')
    .forEach((song, idx) => {
      const songLines = song.split('\r\n')
      const [_, title] = songLines.splice(0, 2)
      const id = md5(`${nameFile}-${idx + 100_000}`)

      parsedSongs[id] = { id, title, lyrics: songLines.join('\n') }
    })

  fs.writeFile(newPathFile, JSON.stringify(parsedSongs, null, 2))
} catch (error) {
  console.error(error)
  throw new Error((error as Error).message)
}
