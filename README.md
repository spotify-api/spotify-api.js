# spotify-api.js

A complete node js wrapper to interact with the spotify api.

# Installation

```bash
npm i spotify-api.js
```

# Getting Started

Please make an App from here https://developer.spotify.com/dashboard/

# Getting Access Token

```js
const client = require("spotify-api.js");
const fs = require("fs");
const spotify = new client.Client("NO TOKEN"); //keep it like that
const token = spotify.oauth.get({
  client_id: "client id",
  client_secret: "client secret",
}); //replace the id and secret with real ones...
fs.writeFile("./auth", token); //spotify tokens resets every 5 mins to avoid api spam we recommened using setTimeout
```

# Track

```js
const client = require("spotify-api.js");
const spotify = new client.Client("token"); //replace token with real access token
const track = spotify.track.search("oh my god by alec benjamin", 1); //searches for a track and 1 is the limit
const advanced = spotify.track.search("oh my god by alec benjamin", 2, {
  advanced: true,
}); //same as search but returns with color and code image
const get = spotify.track.get("track id"); //returns track by track ID
const trackAnalysis = spotify.track.analysis("track id");
const features = spotify.track.audioFeatures("track id"); // returns audio features
```

# Artist

```js
const client = require("spotify-api.js");
const spotify = new client.Client("token"); //replace token with real access token
const artist = spotify.artist.search("alec benjamin", 1); //searches for artist and 1 is the limit
const advanced = spotify.artist.search("alec benjamin", 2, { advanced: true }); //same as search but returns with color and code image
const get = spotify.artist.get("artist id"); //returns artist by Artist ID | this function also has advanced method
const topTracks = spotify.artist.top('artist id') //returns top tracks| this function also has advanced method
```

# Album

```js
const client = require("spotify-api.js");
const spotify = new client.Client("token"); //replace token with real access token
const album = spotify.album.search("these two windows", 1); //searches for an album and 1 is the limit
const get = spotify.album.get("album id"); //returns album by id
const tracks = spotify.album.tracks("album id", 5); //returns tracks inside an album
```
# User 
```js
const client = require("spotify-api.js");
const spotify = new client.Client("token"); //replace token with real access token
const user = spotify.user.get('id')
```
# Playlist 
```js
const client = require("spotify-api.js");
const spotify = new client.Client("token"); //replace token with real access token
const playlist = spotify.playlist.get('id')
const tracks = spotify.playlist.tracks('id',1,{advanced:true}) //advanced is optional along with limit if left empty limit is 1 and advanced is false
```
# Example
Take the following code for example
```js
const client = require("spotify-api.js");
const spotify = new client.Client("token")
const track =await spotify.track.search("oh my god by alec benjamin", 1,{advanced:true})
console.log(track[0].images[0].url,track[0].codeImg)
```
- This will return the following -
- <img src = "https://i.scdn.co/image/ab67616d0000b273ee0232b590932e81529781e1" width ="200" height = "200"></img>
- <img src = "https://scannables.scdn.co/uri/plain/jpeg/786a95/white/1080/spotify:track:44I5NYJ7CGEcaLOuG2zJsU" width = '600' height = "150"></img>


