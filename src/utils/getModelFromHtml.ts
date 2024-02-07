import { load } from 'cheerio'
import { cleanLine } from './cleanLine.ts'

export function getModelFromHtml(html: string, titleSelector: string, textSelector: string) {
  const $ = load(html)
  const titleText = $(titleSelector).text()
  const songText = $(textSelector).text()

  const title = cleanLine(titleText)
  const lyrics = cleanLine(songText)

  return { title, lyrics }
}
