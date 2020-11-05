module.exports = {
    Client: {
        description: 'Spotify Client class to interact with spotify api! Remember client.user can only be used when you are using a scoped token.',
        example: 'client',
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
                description: "Returns new util class",
                type: 'Util',
                href: 'https://spotify-api-js-test.netlify.app/#/class/util'
            },
            oauth: {
                description: "All authorization endpoints",
                type: 'Auth',
                href: 'https://spotify-api-js-test.netlify.app/#/class/auth'
            },
            albums: {
                description: "Album api endpoints",
                type: 'Album',
                href: 'https://spotify-api-js-test.netlify.app/#/class/album'
            },
            artists: {
                description: "Artist api endpoints",
                type: 'Artist',
                href: 'https://spotify-api-js-test.netlify.app/#/class/artist'
            },
            playlists: {
                description: "Playlist api endpoints",
                type: 'Playlist',
                href: 'https://spotify-api-js-test.netlify.app/#/class/playlist'
            },
            tracks: {
                description: "Track api endpoints",
                type: 'Track',
                href: 'https://spotify-api-js-test.netlify.app/#/class/track'
            },
            users: {
                description: "User api endpoints",
                type: 'User',
                href: 'https://spotify-api-js-test.netlify.app/#/class/user'
            },
            episodes: {
                description: "Episode api endpoints",
                type: 'Episode',
                href: 'https://spotify-api-js-test.netlify.app/#/class/episode'
            },
            shows: {
                description: "Show api endpoints",
                type: 'Show',
                href: 'https://spotify-api-js-test.netlify.app/#/class/show'
            },
            browse: {
                description: "Spotify browsing api endpoints",
                type: 'Browse',
                href: 'https://spotify-api-js-test.netlify.app/#/class/browse'
            },
            user: {
                description: "Current User api endpoints",
                type: 'UserClient',
                href: 'https://spotify-api-js-test.netlify.app/#/class/userclient'
            }
        },
        methods: {
            search: {
                description: 'Search through various types. But will not have advanced option.',
                returns: 'Promise <any>',
                parameters: [
                    [
                        'query',
                        'string',
                        'Your query to search'
                    ],
                    [
                        'options',
                        'SearchOptions',
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
    },
    Auth: {
        description: 'Oauth class. All auth endpoints.',
        example: 'auth',
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
            }
        },
        methods: {
            get: {
                description: "Generates a new api auth token",
                returns: "Promise <string>",
                parameters: [
                    [
                        "options",
                        "{ client_id: string, client_secret: string }",
                        "Your client secret and client id in object form"
                    ]
                ]
            },
            build: {
                description: "Builds and Authorization String",
                returns: 'Promise <string>',
                parameters: [
                    [
                        'options',
                        '{ client_id: string, client_secret: string, redirect_uri: string }',
                        'Your client id, client secret and redirect uri in object form'
                    ]
                ]
            }
        }
    }
}