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
> **Type:** <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a>

---
## Methods
<h3 style="font-family: consolas; font-weight: lighter;" id="hextorgb">.hexToRgb(<font style="opacity: 0.7; font-weight: light;">hex</font>)</h3>

> Coverts hex code to rgb number array
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | hex | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a> | Hex code to convert |
> 
> **Returns:** <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array">number[]</a>
<h3 style="font-family: consolas; font-weight: lighter;" id="fetch">.fetch(<font style="opacity: 0.7; font-weight: light;">options</font>)</h3>

> Quick method to fetch from spotify api. Will return the data required or will throw error if bad request.
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | options | [FetchOptions](/typedef/fetchoptions) | Options to fetch |
> 
> **Returns:** <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise">Promise&lt;any&gt;</a>
<h3 style="font-family: consolas; font-weight: lighter;" id="geturidata">.getURIData(<font style="opacity: 0.7; font-weight: light;">uri</font>)</h3>

> Returns the spotify uri data requested
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | uri | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a> | Uri |
> 
> **Returns:** <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise">Promise&lt;any&gt;</a>
<h3 style="font-family: consolas; font-weight: lighter;" id="getcodeimage">.getCodeImage(<font style="opacity: 0.7; font-weight: light;">uri</font>)</h3>

> Returns the code image url by the spotify uri
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | uri | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a> | Uri |
> 
> **Returns:** <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise">Promise&lt;string&gt;</a>