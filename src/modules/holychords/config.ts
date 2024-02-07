import { SongOption } from '../../api/fetchSongTextById.ts'

export const config: SongOption = {
  baseURL: 'https://holychords.pro',
  titleSelector: 'h2.t-worship-leader__marquee__headline.mb-0',
  textSelector: '#music_text',
}
