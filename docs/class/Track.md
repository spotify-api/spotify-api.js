# Track

Methods related to Spotify Tracks

---
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>


---
<h3 style="font-family: consolas;" id="token">.token<font style="opacity: 0.7; font-weight: light;">: <p>string</p></font></h3>

> Your auth token
> 

---
<h3 style="font-family: consolas;" id="search">.search(<font style="opacity: 0.7; font-weight: light;">q: <p>string</p>, options?: <p>{ limit?: number, advanced?: boolean }</p></font>)</h3>

> Search tracks
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | q | string | Query to search |
> | options | { limit?: number, advanced?: boolean } | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** "Promise<any[]>"

---
<h3 style="font-family: consolas;" id="get">.get(<font style="opacity: 0.7; font-weight: light;">id: <p>string</p></font>)</h3>

> Get track info by id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | string | Id of the track |
> 
> **Returns:** "Promise<any>"

---
<h3 style="font-family: consolas;" id="audiofeatures">.audioFeatures(<font style="opacity: 0.7; font-weight: light;">id: <p>string</p></font>)</h3>

> Get audio features of the track by id.
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | string | Id of the track |
> 
> **Returns:** "Promise<any>"

---
<h3 style="font-family: consolas;" id="audioanalysis">.audioAnalysis(<font style="opacity: 0.7; font-weight: light;">id: <p>string</p></font>)</h3>

> Audio Analysis of a track by its id.
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | string | Id of the track |
> 
> **Returns:** "Promise<any>"