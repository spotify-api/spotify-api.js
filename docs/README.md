<div align="center">
  <img src="https://media.discordapp.net/attachments/736466510888960020/760853915876327464/Sa.png?width=718&height=275"><br>
  <div>
    <a href="https://spotify-apijs.netlify.app/#/"><img src="https://img.shields.io/badge/READ-DOCS-orange?style=for-the-badge"></a>
    <a href="https://github.com/spotify-api/spotify-api.js/"><img src="https://img.shields.io/github/repo-size/spotify-api/spotify-api.js?label=Size&style=for-the-badge"></a>
    <a href="https://www.npmjs.com/package/spotify-api.js"><img src="https://img.shields.io/npm/v/spotify-api.js?label=Version&style=for-the-badge"></a>
  </div><br>
</div>

# About

Spotify-api.js is a powerful [Node.js](https://nodejs.org/en/) wrapper to interact with [Spotify Web Api](https://developer.spotify.com/documentation/web-api/) quick and fast.

# Why 

- Object Oriented
- Covers 100% of spotify api endpoints
- Easy to use methods
- Advanced options
- 100% Promise based
- Easy to learn and use methods

# Example

```js
const Spotify = require('spotify-api.js');
const client = new Spotify.Client('token');

client.tracks.search('some-search').then(console.log);
```

<div class="bottom-links" style="background-color: none;" align="center">
    <a href="/#/class/client">Get Started</a>
</div>