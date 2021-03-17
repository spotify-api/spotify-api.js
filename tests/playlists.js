const Spotify = require('../dist/index');

module.exports = (tester, client) => {
    // Get a playlist
    tester('Get a playlist', tester.instanceof(async () => {
        return await client.playlists.get("2Jc6nEMO8tYZH1bUdjdroZ");
    }, Spotify.Playlist));

    // Get playlist's images
    tester('Get images of the playlist', tester.instanceof(async () => {
        return await client.playlists.getImages("2Jc6nEMO8tYZH1bUdjdroZ");
    }, Array));
}