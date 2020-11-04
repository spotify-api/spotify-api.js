# Playlist

Methods related to playlist

---
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>


---
<h3 style="font-family: consolas;" id="token">.token<font style="opacity: 0.7; font-weight: light;">: >string</font></h3>

> Your auth token
> 

---
<h3 style="font-family: consolas;" id="get">.get(<font style="opacity: 0.7; font-weight: light;">id: >string</font>)</h3>

> Get the spotofy playlist info by id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | string | Id of the spotify playlist |
> 
> **Returns:** "Promise<any>"

---
<h3 style="font-family: consolas;" id="gettracks">.getTracks(<font style="opacity: 0.7; font-weight: light;">id: >string, options?: >{ limit?: number, advanced?: boolean }</font>)</h3>

> Get the spotofy playlist tracks by id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | string | Id of the spotify playlist |
> | options | { limit?: number, advanced?: boolean } | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** "Promise<any[]>"