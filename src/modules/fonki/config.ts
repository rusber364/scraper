import { SongOption } from '../../api/fetchSongTextById.ts'

export const config: SongOption = {
  baseURL: 'https://fonki.pro',
  titleSelector: '.entry-title.text-truncate',
  textSelector: '#texts',
}
