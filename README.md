# spotify-api.js
A complete node js wrapper to interact with the spotify api.
# Installation
```bash
npm i spotify-api.js
```
# Getting Started
Please make an App from here https://developer.spotify.com/dashboard/

# Getting Access Token
```js
const client = require('spotify-api.js')
const fs = require('fs')
const spotify = new client.Client('NO TOKEN') //keep it like that
const token = spotify.oauth.get({
    client_id:'client id',
    client_secret:'client secret'
}) //replace the id and secret with real ones...
fs.writeFile('./auth',token) //spotify tokens resets every 5 mins to avoid api spam we recommened using setTimeout
```
# Track
```js
const client = require('spotify-api.js')
const spotify = new client.Client('token') //replace token with real access token
const track = spotify.track.search('oh my god by alec benjamin',1) //searches for a track and 1 is the limit
const advanced = spotify.track.advanced('oh my god by alec benjamin')  //same as search but returns with color and code image
const get = spotify.track.get('track id') //returns track by track ID
```
# Artist 
```js
const client = require('spotify-api.js')
const spotify = new client.Client('token') //replace token with real access token
const track = spotify.artist.search('alec benjamin',1) //searches for artist and 1 is the limit
const advanced = spotify.artist.advanced('oh my god by alec benjamin')  //same as search but returns with color and code image
const get = spotify.artist.get('artist id') //returns artist by Artist ID
```
# Typescript Supported !!
