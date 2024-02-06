var host
// 1:name -> fonki
// 2:name -> holychords
// name -> psalms

/**
 * Represents a search result containing the host URL and input text.
 * @typedef {Object} SearchResult
 * @property {string} host - The host URL.
 * @property {string} inputText - The input text extracted from the search string.
 */

/**
 * Matches the search string prefix to a specific host and extracts input text.
 * @param {string} search - The search string, optionally prefixed with a number.
 * @returns {SearchResult} An object containing the matched host URL and input text.
 */
function matchHost(search) {
  var baseUrl = 'http://localhost:3000'

  var results = search.split(':')
  var prefix = results[0]
  var inputText = results[1] || search

  switch (prefix) {
    case '1':
      return { host: baseUrl.concat('/fonki/'), inputText: inputText }
    case '2':
      return { host: baseUrl.concat('/holychords/'), inputText: inputText }
    default:
      return { host: baseUrl.concat('/psalms/'), inputText: inputText }
  }
}

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
  var matched = matchHost(input.text)
  host = matched.host
  var inputSearch = matched.inputText.split('^')
  var text = inputSearch[0]
  var page = inputSearch[1] || ''

  return host.concat(encodeURI(text)).concat('?page=' + page)
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
