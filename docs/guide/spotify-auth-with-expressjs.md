# Spotify auth with expressjs

Make a very cool spotify authorization for your website with expressjs!

## Things to do

- Create an spotify api app and get client id and client secret from [here](https://developer.spotify.com/dashboard/)
- Install spotify-api.js
- Learn [Spotify.Auth](/class/auth)
- Take a look up over the [Spotify Web Spi Auth Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/)
- Learn about [Spotify Auth Scopes](https://developer.spotify.com/documentation/general/guides/scopes/)

This is a very basic and simple chart what you do now

1. You redirect the user to a spotify auth site by building the url with selected scopes and redirect uri using express
2. User logins
3. Spotify web api returns to a callback site where the api sends a code query
4. Using express, you process the query using [Spotify.Auth.refresh](/class/auth/#refresh) which returns [AuthRefresh](/typedef/AuthRefresh)

```js
// Load your web app
const express = require('express')
const app = express();

// Import spotify-api.js
const Spotify = require('spotify-api.js');

// Load auth class
const auth = new Spotify.Auth();

// Login site
app.get('/login', (req, res) => {
    res.redirect(
        auth.build({
            client_id: 'client-id', // Your spotify app client id
            redirect_uri: 'your-site/callback', // Your callback site where web api will send a code
            scopes: 'scope1 scope2' // Replace scope1 scope2 with your list of scoped with spaces in between
        })
    );
});

app.get('/callback', (req, res) => {
    const user = new Spotify.UserClient();

    user.login({
        client_id: 'client-id', // Your spotify app client id
        client_secret: 'client-secret', // Your spotify app client secret
        redirect_uri: 'your-site/callback', // Will not redirect, it is a verification method so keep the same redirect uri
        code: req.query.code // Code sent by the api
    })
    .then(() => res.send(user.info())) // This will display the user information
    .catch(res.send) // Returns error
    
});

app.listen(3000);
```