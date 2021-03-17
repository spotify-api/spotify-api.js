const Spotify = require('../dist/index');
const tester = require('./tester');

module.exports = (client) => {
    // Get a playlist
    tester('Get a playlist', async () => await client.playlists.get("2Jc6nEMO8tYZH1bUdjdroZ"), {
        check: x => x instanceof Spotify.Playlist
    });

    // Get playlist's images
    tester('Get images of the playlist', async () => await client.playlists.getImages("2Jc6nEMO8tYZH1bUdjdroZ"), {
        check: Array.isArray
    });
}