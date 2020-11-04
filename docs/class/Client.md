# Client

Spotify Client

---
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>


---
<h3 style="font-family: consolas;" id="token">.token<font style="opacity: 0.7; font-weight: light;">: string</font></h3>

> Your auth token
> 

---
<h3 style="font-family: consolas;" id="utils">.utils<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/util">Util</a></font></h3>

> Util class
> 

---
<h3 style="font-family: consolas;" id="oauth">.oauth<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/auth">Auth</a></font></h3>

> Auth class
> 

---
<h3 style="font-family: consolas;" id="albums">.albums<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/album">Album</a></font></h3>

> Album class
> 

---
<h3 style="font-family: consolas;" id="artists">.artists<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/artist">Artist</a></font></h3>

> Artist class
> 

---
<h3 style="font-family: consolas;" id="playlists">.playlists<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/playlist">Playlist</a></font></h3>

> Playlist class
> 

---
<h3 style="font-family: consolas;" id="tracks">.tracks<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/track">Track</a></font></h3>

> Track class
> 

---
<h3 style="font-family: consolas;" id="users">.users<font style="opacity: 0.7; font-weight: light;">: <a href="https://spotify-api-js-test.netlify.app/#/class/user">User</a></font></h3>

> User class
> 

---
<h3 style="font-family: consolas;" id="search">.search(<font style="opacity: 0.7; font-weight: light;">query: string, options?: { limit?: number, type?: ('track' | 'artist' | 'album')[] }</font>)</h3>

> Search through various types. But will not have advanced option.
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | query | string | Your query to search |
> | options | { limit?: number, type?: ('track' | 'artist' | 'album')[] } | <font style="opacity: 07;">Optional. </font>Search options |
> 
> **Returns:** "Promise<any>"

---
<h3 style="font-family: consolas;" id="login">.login(<font style="opacity: 0.7; font-weight: light;">token: string</font>)</h3>

> Login to your spotify client.
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | token | string | Your token |
> 
> **Returns:** "void"