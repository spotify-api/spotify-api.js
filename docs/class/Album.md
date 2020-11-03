# Album

Methods related to Spotify Albums

---
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>


---
<h3 style="font-family: consolas;" id="token">.token<font style="opacity: 0.7; font-weight: light;">: string</font></h3>

> Your auth token
> 

---
<h3 style="font-family: consolas;" id="search">.search(<font style="opacity: 0.7; font-weight: light;">q: string, options?: { limit?: number, advanced?: boolean }</font>)</h3>

> Search playlists
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | q | string | Query to search |
> | options | { limit?: number, advanced?: boolean } | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** Promise<any[]>

---
<h3 style="font-family: consolas;" id="get">.get(<font style="opacity: 0.7; font-weight: light;">id: string</font>)</h3>

> Get playlist info by id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | string | Id of the album |
> 
> **Returns:** Promise<any>

---
<h3 style="font-family: consolas;" id="gettracks">.getTracks(<font style="opacity: 0.7; font-weight: light;">id: string, options?: { limit?: number, advanced?: boolean }</font>)</h3>

> Get playlist tracks by id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | string | Id of the album |
> | options | { limit?: number, advanced?: boolean } | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** Promise<any>