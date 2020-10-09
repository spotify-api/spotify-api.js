<div align="center">
  <img src="https://media.discordapp.net/attachments/736466510888960020/760853915876327464/Sa.png?width=718&height=275"><br>
  <div>
    <a href="https://spotify-apijs.netlify.app/#/"><img src="https://img.shields.io/badge/READ-DOCS-orange?style=for-the-badge"></a>
    <a href="https://github.com/spotify-api/spotify-api.js/"><img src="https://img.shields.io/github/repo-size/spotify-api/spotify-api.js?label=Size&style=for-the-badge"></a>
    <a href="https://www.npmjs.com/package/spotify-api.js"><img src="https://img.shields.io/npm/v/spotify-api.js?label=Version&style=for-the-badge"></a>
  </div><br>
</div>

# Quick Intro

Spotify-api.js is a quick wrapper to interact with spotify api...

# Installation

```bash
npm i spotify-api.js
```

# Getting Started

Please make an App from here https://developer.spotify.com/dashboard/

# Getting Access Token

```js
const { Client } = require("spotify-api.js");
const spotify = new Client("NO TOKEN"); // Keep it like that to get a new token...

const token = await spotify.oauth.get({
  client_id: "client id",
  client_secret: "client secret",
}); // Will return a promise of token and its details

console.log(token.access_token); // Spotify resets its token each every 1-5 minutes to prevent api spam!
```

# Tracks

```js
const track = await spotify.tracks.search("oh my god by alec benjamin", { limit: 1 }); // Searches for the track and limit will be 20 by default
const advanced = await spotify.tracks.search("oh my god by alec benjamin", { limit: 1, advanced: true }); // Same but this will return a `codeImage` and `dominantColor` key with it!
const get = await spotify.tracks.get("track id"); // Get tracks by id...
const audioAnalysis = await spotify.tracks.audioAnalysis("track id"); // Get audio analysis of the track
const audioFeatures = await spotify.tracks.audioFeatures("track id"); // Get audio features of the track
```

# Artists

```js
const artist = await spotify.artists.search("alec benjamin", { limit: 1 }); // Searches for the artist with a default limit as 1...
const advanced = await spotify.artists.search("alec benjamin", { limit: 1, advanced: true }); // Returns a `dominantColor` and `codeImage` key with the response../
const get = await spotify.artists.get("artist id"); // Get artists by id. Has advanced option too...
const albums = await spotify.artists.getAlbums("artist id"); // Get artist albums by id. Has advanced and limit option too...
const topTracks = await spotify.artists.topTracks('artist id') // Returns top tracks of the artist. Has advanced and limit option too...
const relatedArtists = await spotify.artists.relatedArtists('artist id') // Returns related artists. Has advanced and limit option too...
```

# Albums

```js
const album = await spotify.albums.search("these two windows", { limit: 1 }); // Searches for an album. Has advanced option too...
const get = await spotify.albums.get("album id"); // Get album by id...
const tracks = await spotify.albums.getTracks("album id", { limit: 5 }); // Get all tracks of an album. Has advanced option too...
```

# Users

```js
const user = await spotify.users.get('id') // Returns the user details by id...
```

# Playlists

```js
const playlist = await spotify.playlists.get('id') // Get playlist data by id
const tracks = await spotify.playlists.getTracks('id', { limit: 1 }) // Get all tracks in an album by id. Has advanced option too...
```

# Example for advanced option...

Take the following code for example

```js
const { Client } = require("spotify-api.js"); // Import package
const spotify = new Client("token"); // Load client with token or using oauth

const track = await spotify.tracks.search("oh my god by alec benjamin", { limit: 1, advanced:true }); // Search albums
console.log(track[0].codeImage); // Get the code image for advanced...
console.log(track[0].dominantColor); // Get the dominant color... Returns { hex: string, rgb: [r, g, b, a] }
```

### Example for the cover and code image

- <img src = "https://scannables.scdn.co/uri/plain/jpeg/786a95/white/1080/spotify:track:44I5NYJ7CGEcaLOuG2zJsU" width = '600' height = "150"></img>
