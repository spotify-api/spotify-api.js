<div align="center">
  <img src="https://media.discordapp.net/attachments/736466510888960020/760853915876327464/Sa.png?width=718&height=275"><br>
  <div>
    <a href="https://spotify-api.js.org"><img src="https://img.shields.io/badge/READ-DOCS-orange?style=for-the-badge"></a>
    <a href="https://github.com/spotify-api/spotify-api.js/"><img src="https://img.shields.io/github/repo-size/spotify-api/spotify-api.js?label=Size&style=for-the-badge"></a>
    <a href="https://www.npmjs.com/package/spotify-api.js"><img src="https://img.shields.io/npm/v/spotify-api.js?label=Version&style=for-the-badge"></a>
    <a href="https://discord.gg/FrduEZd"><img src="https://img.shields.io/discord/736099894963601438?label=Discord&style=for-the-badge"></a>
  </div><br>
</div>

# Quick Intro

Spotify-api.js is a promise based quick wrapper for spotify web api which covers the all the api endpoints!<br/>
You can read the docs of this package by clicking [here](https://spotify-api.js.org)<br/>
You can join our discord server for additional support from [here](https://discord.gg/FrduEZd).<br/>
**WARNING:** Make sure you are using v6 of spotify-api.js as v5 has many bugs and axios security fix!

# Installation

```bash
npm i spotify-api.js
```

# Getting Started

Please make an App from here https://developer.spotify.com/dashboard/

# Contents

- [Client](https://spotify-api.js.org/#/docs/class/Client)
- [Authorization](https://spotify-api.js.org/#/docs/class/Auth)
- [Current user client](https://spotify-api.js.org/#/docs/class/UserClient)
- [Current user player](https://spotify-api.js.org/#/docs/class/UserPlayer)

# Getting Access Token

```js
const Spotify = require("spotify-api.js");
const Auth = new Spotify.Auth();

const token = await Auth.get({
    client_id: "client id",
    client_secret: "client secret",
}); // Will return a promise of token 

console.log(token); // Spotify resets its token each every 1-5 minutes to prevent api spam!
```

> Remember that you need scoped token for Client.user and Client.user.player which uses current user api endpoints...

# Examples

These are just some small examples, you can view the docs for a more brief documentation...

## Tracks

```js
const track = await spotify.tracks.search("oh my god by alec benjamin", { limit: 1 }); // Searches for the track and limit will be 20 by default
const advanced = await spotify.tracks.search("oh my god by alec benjamin", { limit: 1, advanced: true, }); // Same but this will return a `codeImage` and `dominantColor` key with it!
const get = await spotify.tracks.get("track id"); // Get tracks by id...
const audioAnalysis = await spotify.tracks.audioAnalysis("track id"); // Get audio analysis of the track
const audioFeatures = await spotify.tracks.audioFeatures("track id"); // Get audio features of the track
```

## Artists

```js
const artist = await spotify.artists.search("alec benjamin", { limit: 1 }); // Searches for the artist with a default limit as 1...
const advanced = await spotify.artists.search("alec benjamin", { limit: 1, advanced: true, }); // Returns a `dominantColor` and `codeImage` key with the response../
const get = await spotify.artists.get("artist id"); // Get artists by id. Has advanced option too...
const albums = await spotify.artists.getAlbums("artist id"); // Get artist albums by id. Has advanced and limit option too...
const topTracks = await spotify.artists.topTracks("artist id"); // Returns top tracks of the artist. Has advanced and limit option too...
const relatedArtists = await spotify.artists.relatedArtists("artist id"); // Returns related artists. Has advanced and limit option too...
```

## Albums

```js
const album = await spotify.albums.search("these two windows", { limit: 1 }); // Searches for an album. Has advanced option too...
const get = await spotify.albums.get("album id"); // Get album by id...
const tracks = await spotify.albums.getTracks("album id", { limit: 5 }); // Get all tracks of an album. Has advanced option too...
```

## Users

```js
const user = await spotify.users.get("id"); // Returns the user details by id...
```

## Playlists

```js
const playlist = await spotify.playlists.get("id"); // Get playlist data by id
const tracks = await spotify.playlists.getTracks("id", { limit: 1 }); // Get all tracks in an album by id. Has advanced option too...
```

# Examples

## Advanced Option

Take the following code for example

```js
const { Client } = require("spotify-api.js"); // Import package
const spotify = new Client("token"); // Load client with token or using oauth

const track = await spotify.tracks.search("oh my god by alec benjamin", {
    limit: 1,
    advanced: true,
}); // Search albums
console.log(track[0].codeImage); // Get the code image for advanced...
console.log(track[0].dominantColor); // Get the dominant color... Returns { hex: string, rgb: [r, g, b, a] }
```

**Code Image:**<br/>
<img src = "https://scannables.scdn.co/uri/plain/jpeg/786a95/white/1080/spotify:track:44I5NYJ7CGEcaLOuG2zJsU" width = '600' height = "150"></img>

## Getting scoped token

To refresh or to get a scoped token

```js
const Spotify = require('spotify-api.js');
const auth = new Spotify.Auth();

const { refresh_token } = auth.refresh({
    client_id: 'id', // Your app client id
    client_secret: 'secret', // Your app client secret
    code: 'token or code', // The code you received from the search query. You can use refresh token to get new access_token also
    redirect_uri: 'redirect uri' // Redirect uri which you used while auth, which is only for verification
});
```

## Caching

We have built an easy cache system to prevent you from spamming the spotify api!

> Note : By Default cache option is turned off to prevent unwanted memory leak so we recommend you to only use it in case of high usage.

```js
const Spotify = require('spotify-api.js');

// Defining cache options
const DefaultCacheOptions = {
    cacheTracks: true, // incase I only want to cache the tracks only I will this to true
    cacheUsers: false,
    cacheCategories: false,
    cacheEpisodes: false,
    cacheShows: false,
    cachePlaylists: false,
    cacheArtists: false,
    cacheAlbums: false,
    cacheCurrentUser: false,
    cacheFollowers: null
};

const client = new Spotify.Client("TOKEN", DefaultCacheOptions) // passing the cache options
await client.tracks.get("ID"); // The track is now cached
client.cache.tracks.get("ID"); // Returns TrackStructure which is been fetched previously else will return null
await client.tracks.get("ID"); // Second time using the function will return cache one
await client.tracks.get("ID", true); // Using second param will force fetch instead of searching cache!
```

# Important

Currently the package might have bugs so kindly make issues to fix in upcomming versions and there is a lack of documentation which will also be released in the next version! For further doubts join our discord server!
