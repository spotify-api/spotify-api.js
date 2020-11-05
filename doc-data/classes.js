module.exports = {
    Client: {
        description: 'Spotify client.',
        params: [
            [
                'token',
                'string',
                'Your oauth token',
                true
            ]
        ],
        properties: {
            token: {
                description: "Your auth token",
                type: "string"
            },
            utils: {
                description: "Util class",
                type: '[Util](https://spotify-api-js-test.netlify.app/#/class/util)'
            },
            oauth: {
                description: "Auth class",
                type: '[Auth](https://spotify-api-js-test.netlify.app/#/class/auth)'
            },
            albums: {
                description: "Album class",
                type: '[Album](https://spotify-api-js-test.netlify.app/#/class/album)'
            },
            artists: {
                description: "Artist class",
                type: '[Artist](https://spotify-api-js-test.netlify.app/#/class/artist)'
            },
            playlists: {
                description: "Playlist class",
                type: '[Playlist](https://spotify-api-js-test.netlify.app/#/class/playlist)'
            },
            tracks: {
                description: "Track class",
                type: '[Track](https://spotify-api-js-test.netlify.app/#/class/track)'
            },
            users: {
                description: "User class",
                type: '[User](https://spotify-api-js-test.netlify.app/#/class/user)'
            }
        },
        methods: {
            search: {
                description: 'Search through various types. But will not have advanced option.',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'query',
                        'string',
                        'Your query to search'
                    ],
                    [
                        'options',
                        '{ limit?: number, type?: (\'track\' | \'artist\' | \'album\')[] }',
                        'Search options',
                        true
                    ]
                ]
            },
            login: {
                description: 'Login to your spotify client.',
                returns: 'void',
                parameters: [
                    [
                        'token',
                        'string',
                        'Your token'
                    ]
                ]
            }
        }
        }
}