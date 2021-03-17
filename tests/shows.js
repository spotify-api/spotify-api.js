const Spotify = require('../dist/index');

module.exports = (tester, client) => {
    // Get a show
    tester('Get a show', tester.instanceof(async () => {
        return await client.shows.get("5GWgpGC1TzQ6w2zNCxALWA");
    }, Spotify.Show));

    // Get episodes of spotify show
    tester('Get episodes of a show', tester.arrayof(async () => {
        return await client.shows.getEpisodes("5GWgpGC1TzQ6w2zNCxALWA");
    }, Spotify.Episode));
}