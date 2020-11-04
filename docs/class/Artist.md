# Artist

Methods related to Spotify Artists

---
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>


---
<h3 style="font-family: consolas;" id="token">.token<font style="opacity: 0.7; font-weight: light;">: <p>string</p></font></h3>

> Your auth token
> 

---
<h3 style="font-family: consolas;" id="search">.search(<font style="opacity: 0.7; font-weight: light;">q: <p>string</p>, options?: <p>{ limit?: number, advanced?: boolean }</p></font>)</h3>

> Search artists
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | q | string | Query to search |
> | options | { limit?: number, advanced?: boolean } | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** "Promise<any[]>"

---
<h3 style="font-family: consolas;" id="get">.get(<font style="opacity: 0.7; font-weight: light;">id: <p>string</p></font>)</h3>

> Get artist info by id.
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | string | Id of the artist |
> 
> **Returns:** "Promise<any>"

---
<h3 style="font-family: consolas;" id="getalbums">.getAlbums(<font style="opacity: 0.7; font-weight: light;">id: <p>string</p>, options?: <p>{ limit?: number, advanced?: boolean }</p></font>)</h3>

> Get list of albums by the Spotify Artist by the artist id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | string | Id of the artist |
> | options | { limit?: number, advanced?: boolean } | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** "Promise<any[]>"

---
<h3 style="font-family: consolas;" id="toptracks">.topTracks(<font style="opacity: 0.7; font-weight: light;">id: <p>string</p>, options?: <p>{ limit?: number, advanced?: boolean }</p></font>)</h3>

> Get top tracks of the Spotify Artist by the artist id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | string | Id of the artist |
> | options | { limit?: number, advanced?: boolean } | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** "Promise<any[]>"

---
<h3 style="font-family: consolas;" id="relatedartists">.relatedArtists(<font style="opacity: 0.7; font-weight: light;">id: <p>string</p>, options?: <p>{ limit?: number, advanced?: boolean }</p></font>)</h3>

> Get list of related artists of the Spotify Artist by the artist id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | string | Id of the artist |
> | options | { limit?: number, advanced?: boolean } | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** "Promise<any[]>"