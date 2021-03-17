const Spotify = require('../dist/index');
const tester = require('./tester');

module.exports = (client) => {
    // Get a show
    tester('Get a show', async () => await client.shows.get("5GWgpGC1TzQ6w2zNCxALWA"), {
        check: x => x instanceof Spotify.Show
    });

    // Get episodes of spotify show
    tester('Get episodes of the show', async () => await client.shows.getEpisodes("5GWgpGC1TzQ6w2zNCxALWA"), {
        check: x => Array.isArray
    });
}