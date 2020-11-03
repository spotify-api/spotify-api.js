const Spotify = require("spotify-api.js");
const client = new Spotify.Client('YOUR-TOKEN');

client.tracks.search("SOME SEARCH");