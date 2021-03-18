const Spotify = require('../dist/index');
const tester = require('./tester');

module.exports = (client) => {
    // Get a track
    tester('Get a track', async () => await client.tracks.get('46Dxwh73hkHgPg2NCTCzmt'), {
        check: x => x instanceof Spotify.Track
    });
}