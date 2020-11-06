# Album

All album api endpoints in the form of class
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>

> **Properties:** token<br>
> **Methods:** search, get, getTracks
```js
new Spotify.Album("token")
```

---
## Properties
<h3 style="font-family: consolas; font-weight: lighter;" id="token">.token</h3>

> Your auth token<br>
> **Type:** [string](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)

---
## Methods
<h3 style="font-family: consolas; font-weight: lighter;" id="search">.search(<font style="opacity: 0.7; font-weight: light;">q, options</font>)</h3>

> Returns albums search
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | q | [string](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Query to search |
> | options | [BasicOptions](/typedef/BasicOptions) | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** [Promise](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<<font>any</font>[]>
<h3 style="font-family: consolas; font-weight: lighter;" id="get">.get(<font style="opacity: 0.7; font-weight: light;">id</font>)</h3>

> Returns album info by if
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | [string](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Id of the album |
> 
> **Returns:** [Promise](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<<font>any</font>>
<h3 style="font-family: consolas; font-weight: lighter;" id="gettracks">.getTracks(<font style="opacity: 0.7; font-weight: light;">id, options</font>)</h3>

> Returns album tracks by album id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | [string](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Id of the album |
> | options | [BasicOptions](/typedef/BasicOptions) | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** [Promise](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<<font>any</font>>