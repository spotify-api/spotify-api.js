const auth = new Spotify.Auth('token');

auth.get({
    client_id: 'id',
    client_secret: 'secret'
}).then(console.log);