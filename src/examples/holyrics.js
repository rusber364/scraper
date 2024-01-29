function createUrlToSearch(input) {
  //input.text (string)
  //input.title (boolean)
  //input.artist (boolean)
  //input.lyrics (boolean)
  //return 'https://domain.com/search'
  //  + '?text=' + encodeURI(input.text);

  var inputSearch = input.text.split('^')
  var text = inputSearch[0]
  var page = inputSearch[1]

  return 'http://localhost:3000/'.concat(encodeURI(text)).concat('?page=' + page)
}

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

function createUrlToGetById(id) {
  //return 'https://domain.com/get'
  //  + '?id=' + encodeURI(id);

  return 'http://localhost:3000/song/'.concat(id)
}

function parseGetResponseToSong(response) {
  var json = JSON.parse(response)

  return {
    title: json['title'],
    artist: json['artist'],
    author: json['author'],
    lyrics: json['lyrics'],
  }
}
