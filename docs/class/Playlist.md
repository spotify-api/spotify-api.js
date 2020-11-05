# Playlist

All playlist api endpoints in the form of class
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>

> **Properties:** token<br>
> **Methods:** get, getTracks, getCoverImage, follows
```js
new Spotify.Playlist("token")
```

---
## Properties
<h3 style="font-family: consolas; font-weight: lighter;" id="token">.token</h3>

> Your auth token<br>
> **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)

---
## Methods
<h3 style="font-family: consolas; font-weight: lighter;" id="get">.get(<font style="opacity: 0.7; font-weight: light;">id</font>)</h3>

> Returns playlist info by id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Id of the spotify playlist |
> 
> **Returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<<font>any</font>>
<h3 style="font-family: consolas; font-weight: lighter;" id="gettracks">.getTracks(<font style="opacity: 0.7; font-weight: light;">id, options</font>)</h3>

> Returns the tracks of the spotify playlist
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Id of the spotify playlist |
> | options | [BasicOptions](/typedef/BasicOptions) | <font style="opacity: 07;">Optional. </font>Options to help your data collection better! |
> 
> **Returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<<font>any</font>[]>
<h3 style="font-family: consolas; font-weight: lighter;" id="getcoverimage">.getCoverImage(<font style="opacity: 0.7; font-weight: light;">id</font>)</h3>

> Returns the cover image of the playlist by id
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Id of the spotify playlist |
> 
> **Returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<<font>any</font>>
<h3 style="font-family: consolas; font-weight: lighter;" id="follows">.follows(<font style="opacity: 0.7; font-weight: light;">id, userIds</font>)</h3>

> Verify if the user follows the playlist
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | id | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Id of the spotify playlist |
> | userIds | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)[] or string | Id of the users or user. If users use array as [userid1, userid2] else if one user just use userid1 |
> 
> **Returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/boolean)[]>