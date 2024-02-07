import type { SongOption } from '../../types.ts'

export const config: SongOption = {
  baseURL: 'https://fonki.pro',
  titleSelector: '.entry-title.text-truncate',
  textSelector: '#texts',
  searching: {
    urlKey: 'q',
    songsSelector: '#data_list',
    songSelector: '.media-body.text-truncate a',
    page: {
      query: false,
    },
  },
}
