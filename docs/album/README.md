# Album

```js
spotify.album.<method>
```

# Quick Intro

```js
const album = await spotify.albums.search("these two windows", { limit: 1 }); // Searches for an album. Has advanced option too...
const get = await spotify.albums.get("album id"); // Get album by id...
const tracks = await spotify.albums.getTracks("album id", { limit: 5 }); // Get all tracks of an album. Has advanced option too...
```

# Methods

- [get](album/get)
- [tracks](album/tracks)
- [search](album/search)
