<div align="center">
  <img src="https://media.discordapp.net/attachments/736466510888960020/760853915876327464/Sa.png?width=718&height=275"><br>
  <div>
    <a href="https://spotify-api.js.org"><img src="https://img.shields.io/badge/READ-DOCS-red?style=for-the-badge"></a>
    <a href="https://www.npmjs.com/package/spotify-api.js"><img src="https://img.shields.io/npm/dt/spotify-api.js?style=for-the-badge&color=blue"></a>
    <a href="https://www.npmjs.com/package/spotify-api.js"><img src="https://img.shields.io/badge/VERSION-v9.0.0-orange?style=for-the-badge"></a>
    <a href="https://discord.gg/FrduEZd"><img src="https://img.shields.io/discord/736099894963601438?label=Discord&style=for-the-badge"></a>
  </div><br>
</div>

# About

Spotify-api.js is an alternative to work with spotify api with a typesafe environment and with camel cased objects. Make sure to read the documentation [here](https://spotify-api.js.org/).

> This package or the documentation might have bugs, so kindly report us about that in the issues.

# Features 

- Typesafe environment.
- Has typings for api types [here](https://github.com/spotify-api/spotify-types).
- Object oriented with camel case object keys.
- Works with caching too.
- Easy to learn.
- Works with browser and deno too.

# Examples

## Getting started

Installing the package!

```sh
npm i spotify-api.js@latest
```

Get your client id and client secret from [here](https://developer.spotify.com/dashboard/).

## Setting up your spotify client.

```js
const Spotify = require("spotify-api.js");
const client = new Spotify.Client({ token: 'token' });

console.log(await client.tracks.get('id'));
```

Or create a token directly from clientID and clientSecret,

```js
const { Client } = require("spotify-api.js");
const client = new Client({ 
    token: { clientID: 'id', clientSecret: 'secret' },
    // Ready event is required if you are providing clientID and clientSecret fields.
    // As the client has to create the token first with it and then emits the ready event.
    onReady() {
        console.log(await client.tracks.get('id'));
    }
})

// More simpler code with asynchronous operations:
const client = await Client.create({ token: { clientID: 'id', clientSecret: 'secret' } });
console.log(await client.tracks.get('id'));
```

## Setting up your user client.

Get a current user authorized token from the authenication details you got from the request or to refresh the token,

```js
const { Client } = require('spotify-api.js');

const client = await Client.create({
    token: {
        clientID: 'id', // Your spotify application client id.
        clientSecret: 'secret', // Your spotify application client secret.
        code: 'code', // The code search query from the web redirect. Do not use this field if your aim is to refresh the token.
        refreshToken: 'refreshToken', // Use this field only if your aim is to refresh your token instead of getting new one put your refresh token here.
        redirectURL: 'url' // The redirect url which you have used when redirected to the login page.
    }
});

console.log(client.token); // The current user token. 
await client.artists.follow("SOME ARTIST ID"); // And can use the api methods which are for current user if you have the paticular scopes...
```

## Surpassing ratelimits

Ratelimits are common with any api services to prevent spam but sometimes it might be annoying. The client has an options `retryOnRateLimit`. If it is set to true, it would refetch the same request after a paticular time interval sent by the spotify api in the headers `Retry-After` so you cannot face any obstacles. This is disabled by default...

```js
const Spotify = require("spotify-api.js");
const client = new Spotify.Client({ 
    token: 'token',
    retryOnCacheLimit: true
});

console.log(await client.tracks.get('id'));
```

## Auto refreshing token.

The tokens of spotify are temporary so it is a trouble to refresh the token each and every interval of time. As an alternative you can use the `refreshToken` option.

- Using clientID and clientSecret for api only token.
```js
const client = await Client.create({
    refreshToken: true, // Set this to true.
    token: {
        clientID: 'id', // Your spotify application client id.
        clientSecret: 'secret', // Your spotify application client secret.
    },
    // This event is emitted whenever the token is refreshed by either 429 requests or [Client.refresh] method.
    onRefresh() {
        console.log(`Token has been refreshed. New token: ${client.token}!`);
    }
});
```

- Using [GetUserTokenOptions](https://spotify-api.js.org/main/interface/GetUserTokenOptions) for user authorization token.
```js
const client = await Client.create({
    refreshToken: true, // Set this to true.
    token: {
        clientID: 'id', // Your spotify application client id.
        clientSecret: 'secret', // Your spotify application client secret.
        code: 'code', // The code search query from the web redirect.
        redirectURL: 'url' // The redirect url which you have used when redirected to the login page.
    },
    // This event is emitted whenever the token is refreshed by either 429 requests or [Client.refresh] method.
    onRefresh() {
        console.log(`Token has been refreshed. New token: ${client.token}!`);
    }
});
```

> **NOTE:** This option is useless if you just provided the token string and not the clientID and the clientSecret or the current user authorization options.

## Caching

There is an inbuilt cache system for the module. By default the caching is disabled to prevent memory leaking and unwanted processing.

```js
const { Client, Cache } = require('spotify-api.js');

const client = new Client({
    token: "token",
    // If you want to cache all the cache types, you can do it like
    // cacheSettings: true
    cacheSettings: {
        tracks: true // Only tracks will be cached.
    }
});

await client.tracks.get("ID"); // The track is now cached.
console.log(Cache.tracks.get("id")); // You should get the cached track.

await client.tracks.get("ID"); // Second time using the function will return cached one.
await client.tracks.get("ID", true); // Using second parameter as true will force fetch instead of returning from the cache. (This will force fetch directly if cacheSettings is disabled...)
```

# Help

If any doubts, bugs or reports regarding the module or the documentation you can create an [issue](https://github.com/spotify-api/spotify-api.js/issues) in github.