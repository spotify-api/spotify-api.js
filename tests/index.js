const Spotify = require('../dist/index');
const tester = require('./tester');
const config = require('./env.json');

var client = new Spotify.Client('NO TOKEN', {
    cacheUsers: true,
    cachePlaylists: true
});

// Test to login the client
tester("Login to the client", tester.typeof(async () => {
    await client.login(config.id, config.secret);
    return client.token;
}, 'string'));

const args = process.argv.slice(2);
args.forEach(x => {
    let plugin = require(`./${x}.js`);
    plugin(tester, client);
});

tester.runTests();