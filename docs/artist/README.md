# Artist

```js
spotify.artist.<method>
```

# Quick Intro

```js
const artist = await spotify.artists.search("alec benjamin", { limit: 1 }); // Searches for the artist with a default limit as 1...
const advanced = await spotify.artists.search("alec benjamin", { limit: 1, advanced: true }); // Returns a `dominantColor` and `codeImage` key with the response../
const get = await spotify.artists.get("artist id"); // Get artists by id. Has advanced option too...
const albums = await spotify.artists.getAlbums("artist id"); // Get artist albums by id. Has advanced and limit option too...
const topTracks = await spotify.artists.topTracks('artist id') // Returns top tracks of the artist. Has advanced and limit option too...
const relatedArtists = await spotify.artists.relatedArtists('artist id') // Returns related artists. Has advanced and limit option too...
```

# Methods
- [search](/artist/search)
- [get](/artist/get)
- [getAlbums](/artist/getalbums)
- [topTracks](/artist/toptracks)
- [relatedArtists](/artist/relatedartists)
