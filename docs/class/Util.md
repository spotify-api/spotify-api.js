# Util

Utility class. All utility methods are present here.
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>

> **Properties:** token<br>
> **Methods:** hexToRgb, fetch, getURIData, getCodeImage
```js
const util = new Spotify.Util();
```

---
## Properties
<h3 style="font-family: consolas; font-weight: lighter;" id="token">.token</h3>

> Your auth token<br>
> **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)

---
## Methods
<h3 style="font-family: consolas; font-weight: lighter;" id="hextorgb">.hexToRgb(<font style="opacity: 0.7; font-weight: light;">hex</font>)</h3>

> Coverts hex code to rgb number array
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | hex | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Hex code to convert |
> 
> **Returns:** [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number)[]
<h3 style="font-family: consolas; font-weight: lighter;" id="fetch">.fetch(<font style="opacity: 0.7; font-weight: light;">options</font>)</h3>

> Quick method to fetch from spotify api. Will return the data required or will throw error if bad request.
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | options | [FetchOptions](/typedef/FetchOptions) | Options to fetch |
> 
> **Returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<any>
<h3 style="font-family: consolas; font-weight: lighter;" id="geturidata">.getURIData(<font style="opacity: 0.7; font-weight: light;">uri</font>)</h3>

> Returns the spotify uri data requested
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | uri | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Uri |
> 
> **Returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<any>
<h3 style="font-family: consolas; font-weight: lighter;" id="getcodeimage">.getCodeImage(<font style="opacity: 0.7; font-weight: light;">uri</font>)</h3>

> Returns the code image url by the spotify uri
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | uri | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Uri |
> 
> **Returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise)<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)>