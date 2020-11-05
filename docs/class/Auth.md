# Auth

Oauth class. All auth endpoints.
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>

> **Properties:** token<br>
> **Methods:** get, refresh, build
```js
const auth = new Spotify.Auth('token');
```

---
## Properties
<h3 style="font-family: consolas; font-weight: lighter;" id="token">.token</h3>

> Your auth token<br>
> **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)

---
## Methods
<h3 style="font-family: consolas; font-weight: lighter;" id="get">.get(<font style="opacity: 0.7; font-weight: light;">options</font>)</h3>

> Returns a new api auth token
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | options | [AuthGetOptions](/typedef/AuthGetOptions) | Your client secret and client id in object form |
> 
> **Returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)>
<h3 style="font-family: consolas; font-weight: lighter;" id="refresh">.refresh(<font style="opacity: 0.7; font-weight: light;">options</font>)</h3>

> Refreshes and gets a new authorization token at the same time can make a new scoped access_token by using code query sent by spotify authorization.
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | options | [AuthRefreshOptions](/typedef/AuthRefreshOptions) | Your client id, client secret and redirect uri in object form |
> 
> **Returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<AuthRefresh>
<h3 style="font-family: consolas; font-weight: lighter;" id="build">.build(<font style="opacity: 0.7; font-weight: light;">options</font>)</h3>

> Builds an Authorization String
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | options | [AuthBuildOptions](/typedef/AuthBuildOptions) | Your client id, client secret and redirect uri in object form |
> 
> **Returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)>