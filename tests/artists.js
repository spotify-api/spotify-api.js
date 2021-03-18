const Spotify = require('../dist/index');
const tester = require('./tester');

module.exports = (client) => {
    // Get an artist
    tester('Get an artist', async () => await client.artists.get('7vk5e3vY1uw9plTHJAMwjN'), {
        check: x => x instanceof Spotify.Artist
    })

    // Get all albums of an artist
    tester('Get albums of an artist', async () => await client.artists.getAlbums('7vk5e3vY1uw9plTHJAMwjN'), {
        check: Array.isArray
    })

    // Get artists related to an artist
    tester('Get related artists', async () => await client.artists.getRelatedArtists('7vk5e3vY1uw9plTHJAMwjN'), {
        check: Array.isArray
    })

    // Get the top tracks of an artist
    tester('Get top tracks of an artist', async () => await client.artists.getTopTracks('7vk5e3vY1uw9plTHJAMwjN'), {
        check: Array.isArray
    })
}