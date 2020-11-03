const Spotify = require("spotify-api.js");
const client = new Spotify.Client('YOUR-TOKEN');

client.tracks.search("Oh my god"); // will return tracks
client.artists.search("Alec benjamin"); // will return artists
