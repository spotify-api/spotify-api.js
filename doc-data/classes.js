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
                returns: 'Promise<any>',
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
                description: "Returns a new api auth token",
                returns: "Promise<string>",
                parameters: [
                    [
                        "options",
                        "AuthGetOptions",
                        "Your client secret and client id in object form"
                    ]
                ]
            },
            refresh: {
                description: "Refreshes and gets a new authorization token at the same time can make a new scoped access_token by using code query sent by spotify authorization.",
                returns: 'Promise<AuthRefresh>',
                parameters: [
                    [
                        'options',
                        'AuthRefreshOptions',
                        'Your client id, client secret and redirect uri in object form'
                    ]
                ]
            },
            build: {
                description: "Builds an Authorization String",
                returns: 'Promise<string>',
                parameters: [
                    [
                        'options',
                        'AuthBuildOptions',
                        'Your client id, client secret and redirect uri in object form'
                    ]
                ]
            }
        }
    },
    Util: {
        description: 'Utility class. All utility methods are present here.',
        example: 'util',
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
            hexToRgb: {
                description: 'Coverts hex code to rgb number array',
                returns: 'number[]',
                parameters: [
                    [
                        'hex',
                        'string',
                        'Hex code to convert'
                    ]
                ]
            },
            fetch: {
                description: 'Quick method to fetch from spotify api. Will return the data required or will throw error if bad request.',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'options',
                        'FetchOptions',
                        'Options to fetch'
                    ]
                ]
            },
            getURIData: {
                description: 'Returns the spotify uri data requested',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'uri',
                        'string',
                        'Uri'
                    ]
                ]
            },
            getCodeImage: {
                description: 'Returns the code image url by the spotify uri',
                returns: 'Promise<string>',
                parameters: [
                    [
                        'uri',
                        'string',
                        'Uri'
                    ]
                ]
            }
        }
    },
    Browse: {
        description: 'All browse endpoints in the form of class',
        example: 'browse',
        properties: {
            token: {
                description: "Your auth token",
                type: "string"
            }
        },
        methods: {
            getCategory: {
                description: 'Returns the information about the category by the id provided.',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the category'
                    ]
                ]
            },
            getCategoryPlaylists: {
                description: 'Returns the playlists about the category by the id provided.',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the category'
                    ],
                    [
                        'limit',
                        'number',
                        'Limit your results',
                        true
                    ]
                ]
            },
            categories: {
                description: 'Returns the list of all categories.',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'limit',
                        'number',
                        'Limit your results',
                        true
                    ]
                ]
            },
            featuredCategories: {
                description: 'Returns the list of all featured categories.',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'limit',
                        'number',
                        'Limit your results',
                        true
                    ]
                ]
            },
            newReleases: {
                description: 'Returns the list of all new releases.',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'limit',
                        'number',
                        'Limit your results',
                        true
                    ]
                ]
            }
        }
    }
}