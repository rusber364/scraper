import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { parsePsalms } from './parse-psalms.ts'

export async function convertSong() {
  try {
    const [fileName] = process.argv.slice(2)
    const currentFile = path.resolve(process.cwd(), fileName)
    const songs = await fs.readFile(currentFile)
    const newPathFile = currentFile.replace('.sog', '.json')

    fs.writeFile(newPathFile, JSON.stringify(parsePsalms(songs), null, 2))
  } catch (error) {
    console.error(error)
    throw new Error((error as Error).message)
  }
}
