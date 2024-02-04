var host = 'http://localhost:3000'

/**
 * Represents the input parameter for the createUrlToSearch function.
 *
 * @typedef {Object} SearchInput
 * @property {string} text - The search text.
 * @property {boolean} [title] - Indicates whether to include title in the search.
 * @property {boolean} [artist] - Indicates whether to include artist in the search.
 * @property {boolean} [lyrics] - Indicates whether to include lyrics in the search.
 */

/**
 * Generates a search URL based on the provided input parameters.
 *
 * @param {SearchInput} input - The input parameters for the search.
 * @returns {string} The generated search URL.
 */
function createUrlToSearch(input) {
  // var isLocal = new RegExp('@').test(input.text)
  // var inputSearch = input.text.replace('@', '').split('^')
  var isLocal = !input.lyrics
  var pathPrefix = isLocal ? '/psalms/' : '/holychords/'
  var inputSearch = input.text.split('^')
  var text = inputSearch[0]
  var page = inputSearch[1]

  return host
    .concat(pathPrefix)
    .concat(encodeURI(text))
    .concat('?page=' + page)
}

/**
 * Parses the search response JSON to a list of songs.
 *
 * @param {string} response - The JSON response from the search.
 * @returns {Array<{ id: string, title: string, artist_or_author: string }>} The list of songs.
 */
function parseSearchResponseToList(response) {
  var json = JSON.parse(response)
  var songs = []

  for (var i = 0; i < json.length; i++) {
    songs.push({
      id: json[i]['id'],
      title: json[i]['title'],
      artist_or_author: json[i]['author'],
    })
  }

  return songs
}

/**
 * Creates a URL to get song details by ID.
 *
 * @param {string} id - The ID of the song.
 * @returns {string} The URL to get song details.
 */
function createUrlToGetById(id) {
  return host.concat('song/').concat(id)
}

/**
 * Parses the response JSON to get song details.
 *
 * @param {string} response - The JSON response from getting song details.
 * @returns {{ title: string, artist: string, author: string, lyrics: string }} The song details.
 */
function parseGetResponseToSong(response) {
  var json = JSON.parse(response)

  return {
    title: json['title'],
    artist: json['artist'],
    author: json['author'],
    lyrics: json['lyrics'],
  }
}
