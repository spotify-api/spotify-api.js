# Artist

All artist api endpoints in the form of class
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>

> **Properties:** token<br>
> **Methods:** search, get, getAlbums, topTracks, relatedArtists
```js
new Spotify.Artist("token")
```

---
## Properties
<h3 style="font-family: consolas; font-weight: lighter;" id="token">.token</h3>

> Your auth token<br>
> **Type:** [[string](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)

---
## Methods
<h3 style="font-family: consolas; font-weight: lighter;" id="search">.search(<font style="opacity: 0.7; font-weight: light;">q, options</font>)</h3>

> Returns search info by the query and options provided
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | q | [[string](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Query to search |
> | options | [BasicOptions](/typedef/BasicOptions) | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** [Promise](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<<font>any</font>[]>
<h3 style="font-family: consolas; font-weight: lighter;" id="get">.get(<font style="opacity: 0.7; font-weight: light;">id</font>)</h3>

> Returns artist information by id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | [[string](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Id of the artist |
> 
> **Returns:** [Promise](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<<font>any</font>>
<h3 style="font-family: consolas; font-weight: lighter;" id="getalbums">.getAlbums(<font style="opacity: 0.7; font-weight: light;">id, options</font>)</h3>

> Returns the list of albums by the Spotify Artist by the artist id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | [[string](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Id of the artist |
> | options | [BasicOptions](/typedef/BasicOptions) | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** [Promise](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<<font>any</font>[]>
<h3 style="font-family: consolas; font-weight: lighter;" id="toptracks">.topTracks(<font style="opacity: 0.7; font-weight: light;">id, options</font>)</h3>

> Returns the top tracks of the Spotify Artist by the artist id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | [[string](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Id of the artist |
> | options | [BasicOptions](/typedef/BasicOptions) | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** [Promise](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<<font>any</font>[]>
<h3 style="font-family: consolas; font-weight: lighter;" id="relatedartists">.relatedArtists(<font style="opacity: 0.7; font-weight: light;">id, options</font>)</h3>

> Returns list of related artists of the Spotify Artist by the artist id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | [[string](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Id of the artist |
> | options | [BasicOptions](/typedef/BasicOptions) | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** [Promise](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<<font>any</font>[]>