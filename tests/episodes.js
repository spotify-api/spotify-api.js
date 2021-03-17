const Spotify = require('../dist/index');
const tester = require('./tester');

module.exports = (client) => {
    // Get a show
    tester('Get a episode', async () => await client.episodes.get('7roKNC8NpWaE21xJyIyThx'), {
        check: x => x instanceof Spotify.Episode
    });
}