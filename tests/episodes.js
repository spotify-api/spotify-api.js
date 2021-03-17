const Spotify = require('../dist/index');

module.exports = (tester, client) => {
    // Get a show
    tester('Get a episode', tester.instanceof(async () => {
        return await client.episodes.get('7roKNC8NpWaE21xJyIyThx');
    }, Spotify.Episode));
}