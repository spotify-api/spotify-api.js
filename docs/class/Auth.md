# Auth

Oauth class. All auth endpoints.
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>

> **Properties:** token<br>
> **Methods:** search, get, getTracks
```js
const auth = new Spotify.Auth('token');

auth.get({
    client_id: 'id',
    client_secret: 'secret'
}).then(console.log);
```

---
## Properties
<h3 style="font-family: consolas; font-weight: lighter;" id="token">.token</h3>

> Your auth token<br>
> **Type:** <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a>

---
## Methods
<h3 style="font-family: consolas; font-weight: lighter;" id="search">.search(<font style="opacity: 0.7; font-weight: light;">q, options</font>)</h3>

> Search playlists
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | q | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a> | Query to search |
> | options | { limit?: number, advanced?: boolean } | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** "Promise<any[]>"
<h3 style="font-family: consolas; font-weight: lighter;" id="get">.get(<font style="opacity: 0.7; font-weight: light;">id</font>)</h3>

> Get playlist info by id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a> | Id of the album |
> 
> **Returns:** "Promise<any>"
<h3 style="font-family: consolas; font-weight: lighter;" id="gettracks">.getTracks(<font style="opacity: 0.7; font-weight: light;">id, options</font>)</h3>

> Get playlist tracks by id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a> | Id of the album |
> | options | { limit?: number, advanced?: boolean } | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** "Promise<any>"