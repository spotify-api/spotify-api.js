# Auth

Oauth class. All auth endpoints.
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>

> **Properties:** token<br>
> **Methods:** get, build
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
<h3 style="font-family: consolas; font-weight: lighter;" id="get">.get(<font style="opacity: 0.7; font-weight: light;">options</font>)</h3>

> Generates a new api auth token
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | options | { client_id: string, client_secret: string } | Your client secret and client id in object form |
> 
> **Returns:** <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise">Promise <strong<strong>></strong><</strong<strong>></strong>string<strong>></strong></a>
<h3 style="font-family: consolas; font-weight: lighter;" id="build">.build(<font style="opacity: 0.7; font-weight: light;">options</font>)</h3>

> Builds and Authorization String
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | options | { client_id: string, client_secret: string, redirect_uri: string } | Your client id, client secret and redirect uri in object form |
> 
> **Returns:** <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise">Promise <strong<strong>></strong><</strong<strong>></strong>string<strong>></strong></a>