# User

All user api endpoints in the form of class
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>

> **Properties:** token<br>
> **Methods:** get
```js
new Spotify.User("token")
```

---
## Properties
<h3 style="font-family: consolas; font-weight: lighter;" id="token">.token</h3>

> Your auth token<br>
> **Type:** [string](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)

---
## Methods
<h3 style="font-family: consolas; font-weight: lighter;" id="get">.get(<font style="opacity: 0.7; font-weight: light;">id</font>)</h3>

> Returns the spotify user playlists by id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | [string](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Id of the spotify user |
> 
> **Returns:** [Promise](https://developer.mozilla.<strong>or</strong>g/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<<font>any</font>>