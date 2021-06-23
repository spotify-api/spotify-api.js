<div align="center">
  <img src="https://media.discordapp.net/attachments/736466510888960020/760853915876327464/Sa.png?width=718&height=275"><br>
  <div>
    <a href="https://spotify-api.js.org"><img src="https://img.shields.io/badge/READ-DOCS-orange?style=for-the-badge"></a>
    <a href="https://github.com/spotify-api/spotify-api.js/"><img src="https://img.shields.io/github/repo-size/spotify-api/spotify-api.js?label=Size&style=for-the-badge"></a>
    <a href="https://www.npmjs.com/package/spotify-api.js"><img src="https://img.shields.io/npm/v/spotify-api.js?label=Version&style=for-the-badge"></a>
    <a href="https://discord.gg/FrduEZd"><img src="https://img.shields.io/discord/736099894963601438?label=Discord&style=for-the-badge"></a>
  </div><br>
</div>

# About

Spotify-api.js was initially started as an alternative for basic spotify api fetching! Then soon people needed upgrades, so we worked on it and we have made a fully working typed library for spotify api! [Here](https://github.com/spotify-api/spotify-api.js/wiki/Migration-guide-for-v8) is our migration guide for v8 for major changes!

# Features 

- Full Typescript Support
- Object oriented
- Easy to learn
- Covers all of the spotify api methods as javascript functions
- Works with browser too!

# Examples

## Getting started

Installing the package!

```sh
npm i spotify-api.js@latest
```

Getting your client id and client secret from [here](https://developer.spotify.com/dashboard/)

## Setting up Spotify Client!

```js
const Spotify = require("spotify-api.js");
const client = new Spotify.Client('token');

client.tracks.get('id').then(console.log);
```

Or create a token while logging in!

```js
const Spotify = require("spotify-api.js");
const client = new Spotify.Client();

client.login('client_id', 'client_secret').then(async () => {
    console.log(await client.tracks.get('id'));
});
```

## Getting a current user token!

Get a current user authorized token or just refresh to get a new one!

```js
const Spotify = require('spotify-api.js');
const Client = new Spotify.Client();

client.login({
    clientID: 'id', // Your app client id
    clientSecret: 'secret', // Your app client secret
    code: 'code',  // To get new one, enter the code received by spotify api
    redirectURL: 'redirect url' // Redirect url which you used while auth, which is only for verification
}).then(async ({ refreshToken }) => {
    console.log(`Login successful! Refresh token: ${refreshToken}`);
    console.log(await client.tracks.get('id'));
})

// The same but refreshes token instead of getting a new one
client.login({
    clientID: 'id', // Your app client id
    clientSecret: 'secret', // Your app client secret
    refreshToken: 'token', // Use a refresh token instead of a code
    redirectURL: 'redirect url' // Redirect url which you used while auth, which is only for verification
}).then(async ({ refreshToken }) => {
    console.log(`Login successful! Refresh token: ${refreshToken}`);
    console.log(await client.tracks.get('id'));
})
```

## Using Spotify Current User

Spotify-api.js helps you access the current user and its player efficiently.

```js
const client = new Spotify.Client("USERTOKEN");
await client.artists.follow("SOME ARTIST ID");
```

## Caching

We have built an easy cache system to prevent you from spamming the spotify api!

> Note: By Default cache option is turned off to prevent unwanted memory leak so we recommend you to only use it in case of high usage.

```js
const Spotify = require('spotify-api.js');

// Defining cache options
const DefaultCacheOptions = {
    cacheTracks: true, // incase I only want to cache the tracks only I will this to true
    cacheUsers: false,
    cacheCategories: false,
    cacheEpisodes: false,
    cacheShows: false,
    cachePlaylists: false,
    cacheArtists: false,
    cacheAlbums: false,
    cacheCurrentUser: false,
    cacheFollowers: null
};

const client = new Spotify.Client("TOKEN", DefaultCacheOptions) // Passing the cache options
await client.tracks.get("ID"); // The track is now cached
client.cache.tracks.get("ID"); // Returns TrackStructure which is been fetched previously else will return null
await client.tracks.get("ID"); // Second time using the function will return cache one
await client.tracks.get("ID", true); // Using second param will force fetch instead of searching cache!
```

Incase if you have selected cacheCurrentUser option, the client will fetch and cache the current user details on the client start so sometimes the program will start early before client caches so you can do something like this!

```js
const Client = new Spotify.Client("USER_TOKEN", {
    cacheCurrentuser: true,
    async ready(){
        console.log('Cache of current user is ready');
    }
});
```

You can use the `createUser` method to get only the current user with cached by default!!

```js
const user = await Spotify.createUser('token');
console.log(`Created a user with spotify id as ${user.id}`);
```

# More Examples

## Search Api

```js
// Search spotify using api
const search = await client.search('Some query', { limit: 20, type: ['track'] });
console.log(search.tracks.items);
```

## Artists Api

```js
const artists = await client.artists.search('Some query'); // Search artists
const artist = await client.artists.get('id'); // Get a spotify artists by its id
const artists = await client.artists.getMultiple({ ids: ['artist_id_1', 'artist_id_2'] }); // Get multiple spotify artist by their ids
const albums = await client.artists.getAlbums('id'); // Get the albums of the spotify artist
const tracks = await client.artists.getTopTracks('id'); // Get the top tracks of the spotify artist
const related = await client.artists.getReleatedArtists('id'); // Get the releated artists of the spotify artist
const follows = await client.artists.follows('id'); // Check if the current user follows this artist
await client.artists.follow('id'); // Follow an artist
await client.artists.unfollow('id'); // Unfollow an artist
```

## Users Api

```js
const user = await client.users.get('user_id'); // Get a spotify user information by its id
const playlists = await client.users.getPlaylists('user_id'); // Get a spotify user's playlist by its id
const follows = await client.users.follows('id'); // Check if the current user follows this user
await client.users.follow('id'); // Follow an user
await client.users.unfollow('id'); // Unfollow an user
```

## Albums Api

```js
const albums = await client.albums.search('Some query'); // Search albums
const album = await client.albums.get('id'); // Get a spotify album by its id
const albums = await client.albums.getMultiple({ ids: ['album_id_1', 'album_id_2'] }); // Get multiple spotify albums by their ids
const tracks = await client.albums.getTracks('id'); // Get the tracks of the albums
```

## Tracks Api

```js
const search = await client.tracks.search('some search', { limit: 20 }); // Search tracks
const track = await client.tracks.get('track_id'); // Get a spotify track information by its id
const tracks = await client.tracks.getMultiple({ ids: ['track_id_1', 'track_id_2'] }); // Get multiple spotify track information by their ids
const audioFeatures = await client.tracks.getAudioFeatures('id'); // Audio features of the spotify track
const audioAnalysis = await client.tracks.getAudioAnalysis('id'); // Audio analysis of the spotify track
```

## Episodes Api

```js
const search = await client.episodes.search('some search', { limit: 20, market: 'US' }); // Search episodes
const episode = await client.episodes.get('id'); // Get a spotify episode information by its id
const episodes = await client.episodes.getMultiple({ ids: ['episode_id_1', 'episode_id_2'], market: 'US' }); // Get multiple spotify episodes information by their ids
```

## Shows Api

```js
const shows = await client.shows.search('some search', { limit: 20, market: 'US' }); // Search shows
const show = await client.shows.get('id'); // Get a spotify show by its id
const shows = await client.shows.getMultiple({ ids: ['show_id_1', 'show_id_2'], market: 'US' }); // Get multiple spotify show information by their ids
```

## Playlists Api

```js
const playlists = await client.playlists.search('some search', { limit: 20 }); // Search playlists 
const playlist = await client.playlists.get('id'); // Get a spotify playlist by its id
const tracks = await client.playlists.getTracks('id', { limit: 20 }); // Get all the tracks of the spotify playlist by its id
const images = await client.playlists.getImages('id'); // Get all the images of the spotify playlist
const [firstUserFollows, secondUserFollows] = await client.playlists.userFollows('playlist_id', 'user_id_1', 'user_id_2'); // Verify if one or many users follow one playlist
const follows = await client.playlists.follows('id'); // Verify if the current user follows a playlist
const newPlaylist = await client.playlists.create({
    name: 'Funky playlist',
    description: 'My own cool playlist created by spotify-api.js',
    public: true,
    collaborative: false,
    userID: client.user.id // By default will be the current user id!
}); // Create a playlist

await client.playlists.edit('id', { description: 'Edited new description' }); // Edit a playlist
await client.playlists.follow('id'); // Follow a playlist
await client.playlists.unfollow('id'); // Unfollow a playlist
await client.playlists.addItems('id', ['spotify:track:id']); // Add items to a playlist
await client.playlists.reorderItems('id', ['spotify:track:id'], { insertBefore: 10 }) // Reorder the items of the playlist
await client.playlists.removeItems('id', ['spotify:track:id']); // Remove items of the playlist
await client.playlists.uploadImage('id', imageDataUri); // Upload image to the playlist, make sure the URI isn't prepended by 'data:image/jpeg;base64,'
```

## Browse Api

```js
const category = await client.browse.getCategory('party'); // Get a category
const categories = await client.browse.getCategories({ limit: 30 }); // Get all categories
const playlists = await client.browse.getCategoryPlaylists('party', { limit: 10 }); // Get the playlists of a paticular category
const featured = await client.browse.getFeaturedPlaylists(); // Get featured playlists
const newReleases = await client.browse.getNewReleases(); // Get new album releases
const genres = await client.browse.getRecommendedGenres(); // Get recommended genres
```

## Markets Api

```js
console.log(await client.browse.getMarkets()); // Get all markets
```

## Current User Api

```js
const user = await client.user.info(); // Updates the user details cache and returning the client.user object
const topTracks = await client.user.getTopTracks(); // Get top tracks of the current user
const topArtists = await client.user.getTopArtists(); // Get top artists of the current user
const follows = await client.user.followsPlaylist('id'); // Check if the current user follows the playlist
const artists = await client.user.getFollowingArtists(); // Get the current user's following artists

await client.user.followPlaylist('id'); // Follow a playlist
await client.user.unfollowPlaylist('id'); // Unfollow a playlist
```

## Library Api

```js
const albums = await client.user.getAlbums(); // Get all albums saved by the current user
const [hasFirstAlbum, hasSecondAlbum] = await client.user.hasAlbums('id_1', 'id_2'); // Verify if the current user has those albums
await client.user.addAlbums('id_1', 'id_2'); // Add albums to the user's library!
await client.user.deleteAlbums('id_1', 'id_2'); // Remove albums from the user's library!

const tracks = await client.user.getTracks(); // Get all tracks saved by the current user
const [hasFirstTrack, hasSecondTrack] = await client.user.hasTracks('id_1', 'id_2'); // Verify if the current user has those tracks
await client.user.addTracks('id_1', 'id_2'); // Add tracks to the user's library!
await client.user.deleteTracks('id_1', 'id_2'); // Remove tracks from the user's library!

const shows = await client.user.getShows(); // Get all shows saved by the current user
const [hasFirstShow, hasSecondShow] = await client.user.hasShows('id_1', 'id_2'); // Verify if the current user has those shows
await client.user.addShows('id_1', 'id_2'); // Add shows to the user's library!
await client.user.deleteShows('id_1', 'id_2'); // Remove shows from the user's library!

const episodes = await client.user.getEpisodes(); // Get all episodes saved by the current user
const [hasFirstEpisode, hasSecondEpisode] = await client.user.hasEpisodes('id_1', 'id_2'); // Verify if the current user has those episodes
await client.user.addEpisodes('id_1', 'id_2'); // Add episodes to the user's library!
await client.user.deleteEpisodes('id_1', 'id_2'); // Remove episodes from the user's library!
```

## Follow Api

```js
await client.users.follow('id'); // Follow a user
await client.users.unfollow('id'); // Unfollow a user
```

## Player Api

```js
const playback = await client.user.player.getCurrentPlayback(); // Get current user's current playback
const devices = await client.user.player.getDevices(); // Get all the devices where the account is logged in
const currentlyPlaying = await client.user.player.getCurrentlyPlaying(); // Get whats currently playing on the player of the current user!
const recentlyPlayed = await client.user.player.getRecentlyPlayed(); // Returns the history of the player of the current user!

await client.user.player.transferPlayback(['device_id'], { play: true }); // Transfer the current playback to other devices
await client.user.player.play(); // Plays the player of the current user
await client.user.player.pause(); // Pauses the player of the current user
await client.user.player.next(); // Skips to the next track in the current user's player queue
await client.user.player.previous(); // Skips to the previous track in the current user's player queue
await client.user.player.seek(1200); // Seek to a positionf of the item of the player of the current user
await client.user.player.setRepeatMode('track'); // Set repeat mode for the player
await client.user.player.setVolume(30); // Set volume to the player
await client.user.player.shuffle(); // Shuffle the player queue
await client.user.player.shuffle(false); // Unshuffle the player queue
await client.user.player.addItem('spotify:track:id'); // Add an item to the queue
```

## Note

There are more methods than metioned in above examples. You can view all of them at [Documentation](https://spotify-api.js.org)!