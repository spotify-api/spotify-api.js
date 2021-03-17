const Spotify = require('../dist/index');

module.exports = (tester, client) => {
    // Get a user
    tester("Get a user", tester.instanceof(async () => {
        return await client.users.get("ikaho4fxe65tww55inmxa1lrt");
    }, Spotify.User));

    // Get a user playlists
    tester("Get a user's playlists", tester.arrayof(async () => {
        return await client.users.getPlaylists("ikaho4fxe65tww55inmxa1lrt");
    }, Spotify.Playlist));
}