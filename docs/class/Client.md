# Client

Spotify client.
> **Properties:** <a href="#token">token</a>, <a href="#utils">utils</a>, <a href="#oauth">oauth</a>, <a href="#albums">albums</a>, <a href="#artists">artists</a>, <a href="#playlists">playlists</a>, <a href="#tracks">tracks</a>, <a href="#users">users</a><br>
> **Methods:** <a href="#search">search</a>, <a href="#login">login</a>

---
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>


---
## Properties

---
<h3 style="font-family: consolas; font-weight: lighter;" id="token">.token<font style="opacity: 0.7; font-weight: light;">: string</font></h3>

> Your auth token
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="utils">.utils<font style="opacity: 0.7; font-weight: light;">: [Util](https://spotify-api-js-test.netlify.app/#/class/util)</font></h3>

> Util class
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="oauth">.oauth<font style="opacity: 0.7; font-weight: light;">: [Auth](https://spotify-api-js-test.netlify.app/#/class/auth)</font></h3>

> Auth class
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="albums">.albums<font style="opacity: 0.7; font-weight: light;">: [Album](https://spotify-api-js-test.netlify.app/#/class/album)</font></h3>

> Album class
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="artists">.artists<font style="opacity: 0.7; font-weight: light;">: [Artist](https://spotify-api-js-test.netlify.app/#/class/artist)</font></h3>

> Artist class
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="playlists">.playlists<font style="opacity: 0.7; font-weight: light;">: [Playlist](https://spotify-api-js-test.netlify.app/#/class/playlist)</font></h3>

> Playlist class
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="tracks">.tracks<font style="opacity: 0.7; font-weight: light;">: [Track](https://spotify-api-js-test.netlify.app/#/class/track)</font></h3>

> Track class
> 

---
<h3 style="font-family: consolas; font-weight: lighter;" id="users">.users<font style="opacity: 0.7; font-weight: light;">: [User](https://spotify-api-js-test.netlify.app/#/class/user)</font></h3>

> User class
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