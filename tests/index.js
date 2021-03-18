const Spotify = require('../dist/index');
const tester = require('./tester');
const config = require('./env.json');

var client = new Spotify.Client('NO TOKEN');

// Test to login the client
tester("Login to the client", async () => {
    await client.login(config.id, config.secret);
    return client.token;
}, {
    check: x => typeof x == 'string'
});

const args = process.argv.slice(2);
args.forEach(x => {
    let plugin = require(`./${x}.js`);
    plugin(client);
});

tester.runTests();