module.exports = {
    Client: {
        description: 'Spotify Client class to interact with spotify api! Remember client.user can only be used when you are using a scoped token.',
        example: 'new Spotify.Client("token")',
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
        example: 'new Spotify.Util("token")',
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
        example: 'new Spotify.Browse("token")',
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
    },
    Artist:  {
        description: 'All artist api endpoints in the form of class',
        example: 'new Spotify.Artist("token")',
        properties: {
            token: {
                description: "Your auth token",
                type: "string"
            }
        },
        methods: {
            search: {
                description: 'Returns search info by the query and options provided',
                returns: 'Promise<any[]>',
                parameters: [
                    [
                        'q',
                        'string',
                        'Query to search'
                    ],
                    [
                        'options',
                        'BasicOptions',
                        'Options to help your data collection better!',
                        true
                    ]
                ]
            },
            get: {
                description: 'Returns artist information by id',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the artist'
                    ]
                ]
            },
            getAlbums: {
                description: 'Returns the list of albums by the Spotify Artist by the artist id',
                returns: 'Promise<any[]>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the artist'
                    ],
                    [
                        'options',
                        'BasicOptions',
                        'Options to help your data collection better!',
                        true
                    ]
                ]
            },
            topTracks: {
                description: 'Returns the top tracks of the Spotify Artist by the artist id',
                returns: 'Promise<any[]>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the artist'
                    ],
                    [
                        'options',
                        'BasicOptions',
                        'Options to help your data collection better!',
                        true
                    ]
                ]
            },
            relatedArtists: {
                description: 'Returns list of related artists of the Spotify Artist by the artist id',
                returns: 'Promise<any[]>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the artist'
                    ],
                    [
                        'options',
                        'BasicOptions',
                        'Options to help your data collection better!',
                        true
                    ]
                ]
            },
        }
    },
    Album:  {
        description: 'All album api endpoints in the form of class',
        example: 'new Spotify.Album("token")',
        properties: {
            token: {
                description: "Your auth token",
                type: "string"
            }
        },
        methods: {
            search: {
                description: 'Returns albums search',
                returns: 'Promise<any[]>',
                parameters: [
                    [
                        'q',
                        'string',
                        'Query to search'
                    ],
                    [
                        'options',
                        'BasicOptions',
                        'Options to help your data collection better!',
                        true
                    ]
                ]
            },
            get: {
                description: 'Returns album info by if',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the album'
                    ]
                ]
            },
            getTracks: {
                description: 'Returns album tracks by album id',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the album'
                    ],
                    [
                        'options',
                        'BasicOptions',
                        'Options to help your data collection better!',
                        true
                    ]
                ]
            }
        }
    },
    Playlist:  {
        description: 'All playlist api endpoints in the form of class',
        example: 'new Spotify.Playlist("token")',
        properties: {
            token: {
                description: "Your auth token",
                type: "string"
            }
        },
        methods: {
            get: {
                description: 'Returns playlist info by id',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the spotify playlist'
                    ]
                ]
            },
            getTracks: {
                description: 'Returns the tracks of the spotify playlist',
                returns: 'Promise<any[]>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the spotify playlist'
                    ],
                    [
                        'options',
                        'BasicOptions',
                        'Options to help your data collection better!',
                        true
                    ]
                ]
            },
            getCoverImage: {
                description: 'Returns the cover image of the playlist by id',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the spotify playlist'
                    ]
                ]
            },
            follows: {
                description: 'Verify if the user follows the playlist',
                returns: 'Promise<boolean[]>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the spotify playlist'
                    ],
                    [
                        'userIds',
                        'string[] or string',
                        'Id of the users or user. If users use array as [userid1, userid2] else if one user just use userid1'
                    ]
                ]
            },
        }
    },
    User:  {
        description: 'All user api endpoints in the form of class',
        example: 'new Spotify.User("token")',
        properties: {
            token: {
                description: "Your auth token",
                type: "string"
            }
        },
        methods: {
            get: {
                description: 'Returns the spotify user information by id',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the spotify user'
                    ]
                ]
            },
            get: {
                description: 'Returns the spotify user playlists by id',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the spotify user'
                    ]
                ]
            }
        }
    },
    Track:  {
        description: 'All track api endpoints in the form of class',
        example: 'new Spotify.User("token")',
        properties: {
            token: {
                description: "Your auth token",
                type: "string"
            }
        },
        methods: {
            search: {
                description: 'Returns search information of tracks',
                returns: 'Promise<any[]>',
                parameters: [
                    [
                        'q',
                        'string',
                        'Query to search'
                    ],
                    [
                        'options',
                        'BasicOptions',
                        'Options to help your data collection better!',
                        true
                    ]
                ]
            },
            get: {
                description: 'Returns track info by id',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the track'
                    ]
                ]
            },
            audioFeatures: {
                description: 'Returns the audio features by id',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the track'
                    ]
                ]
            },
            audioAnalysis: {
                description: 'Returns the audio analysis of the track by id',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the track'
                    ]
                ]
            }
        }
    },
    Episode:  {
        description: 'All episode api endpoints in the form of class',
        example: 'new Spotify.Episode("token")',
        properties: {
            token: {
                description: "Your auth token",
                type: "string"
            }
        },
        methods: {
            get: {
                description: 'Returns episode information by id',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the episode'
                    ]
                ]
            }
        }
    },
    show:  {
        description: 'All show api endpoints in the form of class',
        example: 'new Spotify.Show("token")',
        properties: {
            token: {
                description: "Your auth token",
                type: "string"
            }
        },
        methods: {
            get: {
                description: 'Returns the show information by id',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the show'
                    ]
                ]
            },
            getEpisodes: {
                description: 'Returns the show episodes by id',
                returns: 'Promise<any>',
                parameters: [
                    [
                        'id',
                        'string',
                        'Id of the show'
                    ],
                    [
                        'limit',
                        'number',
                        'Limit of your results',
                        true
                    ]
                ]
            }
        }
    }
}