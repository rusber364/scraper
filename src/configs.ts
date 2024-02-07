import { SongOption } from './types.ts'

export const fonki: SongOption = {
  routePrefix: '/fonki',
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

export const holychords: SongOption = {
  routePrefix: '/holychords',
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
