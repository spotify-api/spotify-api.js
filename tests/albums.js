const Spotify = require('../dist/index');
const tester = require('./tester');

module.exports = (client) => {
    // Get an album
    tester('Get an album', async () => await client.albums.get('71O60S5gIJSIAhdnrDIh3N'), {
        check: x => x instanceof Spotify.Album
    })

    // Get tracks of an album
    tester('Get tracks of an album', async () => await client.albums.getTracks('71O60S5gIJSIAhdnrDIh3N'), {
        check: Array.isArray
    })
}