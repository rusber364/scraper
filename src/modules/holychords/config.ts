import type { SongOption } from '../../types.ts'

export const config: SongOption = {
  baseURL: 'https://holychords.pro',
  titleSelector: 'h2.t-worship-leader__marquee__headline.mb-0',
  textSelector: '#music_text',
  searching: {
    urlKey: 'name',
    songsSelector: '#entries',
    songSelector: '.media-body.text-truncate a',
    page: {
      query: true,
    },
  },
}
