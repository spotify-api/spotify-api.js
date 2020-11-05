# Client

Spotify Client class to interact with spotify api! Remember client.user can only be used when you are using a scoped token.
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>

> **Properties:** token, utils, oauth, albums, artists, playlists, tracks, users, episodes, shows, broswe, user<br>
> **Methods:** search, login
```js
const client = new Spotify.Client('token');
client.tracks.search('some-search').then(console.log);
```

---
## Properties

---
<h3 style="font-family: consolas; font-weight: lighter;" id="token">.token<font style="opacity: 0.7; font-weight: light;">: string</font></h3>

> Your auth token
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="utils">.utils<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/util">Util</a></font></h3>

> Returns new util class
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="oauth">.oauth<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/auth">Auth</a></font></h3>

> All authorization endpoints
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="albums">.albums<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/album">Album</a></font></h3>

> Album api endpoints
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="artists">.artists<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/artist">Artist</a></font></h3>

> Artist api endpoints
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="playlists">.playlists<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/playlist">Playlist</a></font></h3>

> Playlist api endpoints
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="tracks">.tracks<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/track">Track</a></font></h3>

> Track api endpoints
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="users">.users<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/user">User</a></font></h3>

> User api endpoints
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="episodes">.episodes<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/episode">Episode</a></font></h3>

> Episode api endpoints
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="shows">.shows<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/show">Show</a></font></h3>

> Show api endpoints
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="broswe">.broswe<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/browse">Browse</a></font></h3>

> Spotify browsing api endpoints
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="user">.user<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/userclient">UserClient</a></font></h3>

> Current User api endpoints
> 

---
## Methods

---
<h3 style="font-family: consolas; font-weight: lighter;" id="search">.search(<font style="opacity: 0.7; font-weight: light;">query: string, options?: { limit?: number, type?: ('track' | 'artist' | 'album')[] }</font>)</h3>

> Search through various types. But will not have advanced option.
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | query | string | Your query to search |
> | options | { limit?: number, type?: ('track' | 'artist' | 'album')[] } | <font style="opacity: 07;">Optional. </font>Search options |
> 
> **Returns:** "Promise<any>"

---
<h3 style="font-family: consolas; font-weight: lighter;" id="login">.login(<font style="opacity: 0.7; font-weight: light;">token: string</font>)</h3>

> Login to your spotify client.
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | token | string | Your token |
> 
> **Returns:** "void"