const Spotify = require('../dist/index');
const tester = require('./tester');

module.exports = (client) => {
    // Get a playlist
    tester('Get a playlist', async () => await client.playlists.get("2Jc6nEMO8tYZH1bUdjdroZ"), {
        check: x => x instanceof Spotify.Playlist
    });

    // Get playlist's tracks
    tester('Get playlist tracks', async () => await client.playlists.getTracks('37i9dQZF1DWUq3wF0JVtEy'), {
        check: Array.isArray
    })

    // Get playlist's images
    tester('Get images of the playlist', async () => await client.playlists.getImages("2Jc6nEMO8tYZH1bUdjdroZ"), {
        check: Array.isArray
    });

    // Check if user follows a playlist
    tester('Check user follows a playlist', async () => await client.playlists.userFollows('37i9dQZF1DWUq3wF0JVtEy', 'ikaho4fxe65tww55inmxa1lrt'), {
        check: Array.isArray
    });
}