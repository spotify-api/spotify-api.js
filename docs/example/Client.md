# Client

Example to connect with Spotify Client!

---
```js
const client = new Spotify.Client('token');
client.tracks.search('some-search').then(console.log);
```