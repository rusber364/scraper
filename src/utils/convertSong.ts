import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

try {
  const [fileName] = process.argv.slice(2)
  const currentFile = path.resolve(process.cwd(), fileName)
  const songs = await fs.readFile(currentFile)

  const parsedSongs = songs
    .toString('utf8')
    .split('\r\n\r\n')
    .map((song, idx) => {
      const songLines = song.split('\r\n')
      const [_, title] = songLines.splice(0, 2)

      return { id: idx + 1, title, text: songLines }
    })

  const newPathFile = currentFile.replace('.sog', '.json')
  fs.writeFile(newPathFile, JSON.stringify(parsedSongs, null, 2))
} catch (error) {
  console.error(error)
  throw new Error((error as Error).message)
}
