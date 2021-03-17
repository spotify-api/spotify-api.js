const Spotify = require('../dist/index');
const tester = require('./tester');

module.exports = (client) => {
    // Get a user
    tester("Get a user", async () => await client.users.get("ikaho4fxe65tww55inmxa1lrt"), {
        check: x => x instanceof Spotify.User
    });

    // Get a user playlists
    tester("Get a user's playlists", async () => await client.users.getPlaylists("ikaho4fxe65tww55inmxa1lrt"), {
        check: Array.isArray
    });
}