# Client

Spotify Client class to interact with spotify api! Remember client.user can only be used when you are using a scoped token.
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>

> **Properties:** token, utils, oauth, albums, artists, playlists, tracks, users, episodes, shows, browse, user<br>
> **Methods:** search, login
```js
new Spotify.Client("token")
```

---
## Properties
<h3 style="font-family: consolas; font-weight: lighter;" id="token">.token</h3>

> Your auth token<br>
> **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
<h3 style="font-family: consolas; font-weight: lighter;" id="utils">.utils</h3>

> Returns new util class<br>
> **Type:** <a href="https://spotify-api-js-test.netlify.app/#/class/util">Util</a>
<h3 style="font-family: consolas; font-weight: lighter;" id="oauth">.oauth</h3>

> All authorization endpoints<br>
> **Type:** <a href="https://spotify-api-js-test.netlify.app/#/class/auth">Auth</a>
<h3 style="font-family: consolas; font-weight: lighter;" id="albums">.albums</h3>

> Album api endpoints<br>
> **Type:** <a href="https://spotify-api-js-test.netlify.app/#/class/album">Album</a>
<h3 style="font-family: consolas; font-weight: lighter;" id="artists">.artists</h3>

> Artist api endpoints<br>
> **Type:** <a href="https://spotify-api-js-test.netlify.app/#/class/artist">Artist</a>
<h3 style="font-family: consolas; font-weight: lighter;" id="playlists">.playlists</h3>

> Playlist api endpoints<br>
> **Type:** <a href="https://spotify-api-js-test.netlify.app/#/class/playlist">Playlist</a>
<h3 style="font-family: consolas; font-weight: lighter;" id="tracks">.tracks</h3>

> Track api endpoints<br>
> **Type:** <a href="https://spotify-api-js-test.netlify.app/#/class/track">Track</a>
<h3 style="font-family: consolas; font-weight: lighter;" id="users">.users</h3>

> User api endpoints<br>
> **Type:** <a href="https://spotify-api-js-test.netlify.app/#/class/user">User</a>
<h3 style="font-family: consolas; font-weight: lighter;" id="episodes">.episodes</h3>

> Episode api endpoints<br>
> **Type:** <a href="https://spotify-api-js-test.netlify.app/#/class/episode">Episode</a>
<h3 style="font-family: consolas; font-weight: lighter;" id="shows">.shows</h3>

> Show api endpoints<br>
> **Type:** <a href="https://spotify-api-js-test.netlify.app/#/class/show">Show</a>
<h3 style="font-family: consolas; font-weight: lighter;" id="browse">.browse</h3>

> Spotify browsing api endpoints<br>
> **Type:** <a href="https://spotify-api-js-test.netlify.app/#/class/browse">Browse</a>
<h3 style="font-family: consolas; font-weight: lighter;" id="user">.user</h3>

> Current User api endpoints<br>
> **Type:** <a href="https://spotify-api-js-test.netlify.app/#/class/userclient">UserClient</a>

---
## Methods
<h3 style="font-family: consolas; font-weight: lighter;" id="search">.search(<font style="opacity: 0.7; font-weight: light;">query, options</font>)</h3>

> Search through various types. But will not have advanced option.
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | query | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Your query to search |
> | options | [SearchOptions](/typedef/SearchOptions) | <font style="opacity: 07;">Optional. </font>Search options |
> 
> **Returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<<font>any</font>>
<h3 style="font-family: consolas; font-weight: lighter;" id="login">.login(<font style="opacity: 0.7; font-weight: light;">token</font>)</h3>

> Login to your spotify client.
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | token | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Your token |
> 
> **Returns:** void