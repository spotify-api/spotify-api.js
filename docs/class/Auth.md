# Auth

Methods to get, refresh auth token and build oauth urls

---
<h3 style="font-family: consolas;" id="constructor">constructor(<font style="opacity: 0.7; font-weight: light;">token?: string</font>)</h3>


---
<h3 style="font-family: consolas;" id="token">.token<font style="opacity: 0.7; font-weight: light;">: >string</font></h3>

> Your auth token
> 

---
<h3 style="font-family: consolas;" id="get">.get(<font style="opacity: 0.7; font-weight: light;">options: >{ client<em>id: string, client</em>secret: string }</font>)</h3>

> Generates a new Auth token
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | options | { client_id: string, client_secret: string } | Your client secret and client id in object form |
> 
> **Returns:** "Promise<string>"

---
<h3 style="font-family: consolas;" id="build">.build(<font style="opacity: 0.7; font-weight: light;">options: >{ client<em>id: string, client</em>secret: string, redirect_uri: string }</font>)</h3>

> Builds and Authorization String
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | options | { client_id: string, client_secret: string, redirect_uri: string } | Your client id, client secret and redirect uri in object form |
> 
> **Returns:** "Promise<string>"