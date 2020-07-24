# oauth.get
Gets the Access Token of a Client.

|Parameters|Default Value|Type|
|:--|:--|:--|
|[Client_id](oauth/parameters/clientid)|null|required|
|[Client_secret](oauth/parameters/clientsecret)|null|required|

```js
spotify.oauth.get({'parameters'})
```
# Example
```js
spotify.oauth.get({
  client_id: "client id",
  client_secret: "client secret",
})
```