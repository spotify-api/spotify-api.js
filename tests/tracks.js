const Spotify = require('../dist/index');
const tester = require('./tester');

module.exports = (client) => {
    // Get a track
    tester('Get a track', async () => await client.tracks.get('46Dxwh73hkHgPg2NCTCzmt'), {
        check: x => x instanceof Spotify.Track
    });

    // Get audio features of the track
    tester('Get audio features', async () => await client.tracks.getAudioFeatures('46Dxwh73hkHgPg2NCTCzmt'), {
        check: Boolean
    });

    // Get multiple tracks
    tester('Get multiple tracks', async () => await client.tracks.getMultiple({
        ids: ['46Dxwh73hkHgPg2NCTCzmt']
    }), {
        check: Array.isArray
    })

    // Get audio analysis of the track
    tester('Get audio analysis', async () => await client.tracks.getAudioAnalysis('46Dxwh73hkHgPg2NCTCzmt'), {
        check: Boolean
    });
}