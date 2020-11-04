const a = (text, href) => `[${text}](${href})`

module.exports = {
    Client: {
        config: {
            description: 'Spotify Client'
        },
        token: {
            description: "Your auth token",
            type: "string"
        },
        utils: {
            description: "Util class",
            type: a('Util', 'https://spotifyapijs.netlify.app/#/class/util')
        },
        oauth: {
            description: "Auth class",
            type: a('Auth', 'https://spotifyapijs.netlify.app/#/class/auth')
        },
        albums: {
            description: "Album class",
            type: a('Album', 'https://spotifyapijs.netlify.app/#/class/album')
        },
        artists: {
            description: "Artist class",
            type: a('Artist', 'https://spotifyapijs.netlify.app/#/class/artist')
        },
        playlists: {
            description: "Playlist class",
            type: a('Playlist', 'https://spotifyapijs.netlify.app/#/class/playlist')
        },
        tracks: {
            description: "Track class",
            type: a('Track', 'https://spotifyapijs.netlify.app/#/class/track')
        },
        users: {
            description: "User class",
            type: a('User', 'https://spotifyapijs.netlify.app/#/class/user')
        }
    },
    Util: {
        config: {
            description: 'Utility methods'
        },
        token: {
            description: "Your auth token",
            type: "string"
        },
        hexToRgb: {
            description: 'Coverts hex to rgb',
            returns: 'number[] | void',
            parameters: [
                [
                    'hex',
                    'string',
                    'Hex code to convert'
                ]
            ]
        },
        fetch: {
            description: 'Easy to fetch spotify api',
            returns: 'Promise<any>',
            parameters: [
                [
                    'options',
                    '{ link: string, params?: any, headers?: any }',
                    'Fetch Options'
                ]
            ]
        },
        getURIData: {
            description: 'Get uri data',
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
            description: 'Returns the code image',
            returns: 'Promise<any>',
            parameters: [
                [
                    'uri',
                    'string',
                    'Uri'
                ]
            ]
        }
    },
    Auth: {
        config: {
            description: "Methods to get, refresh auth token and build oauth urls"
        },
        token: {
            description: "Your auth token",
            type: "string"
        },
        get: {
            description: "Generates a new Auth token",
            returns: "Promise<string>",
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
            returns: 'Promise<string>',
            parameters: [
                [
                    'options',
                    '{ client_id: string, client_secret: string, redirect_uri: string }',
                    'Your client id, client secret and redirect uri in object form'
                ]
            ]
        }
    },
    User: {
        config: {
            description: 'Fetch spotify user information'
        },
        token: {
            description: "Your auth token",
            type: "string"
        },
        get: {
            description: 'Get the spotify user information by id',
            returns: 'Promise<any>',
            parameters: [
                [
                    'id',
                    'string',
                    'Id of the spotify user'
                ]
            ]
        }
    },
    Playlist: {
        config: {
            description: 'Methods related to playlist'
        },
        token: {
            description: "Your auth token",
            type: "string"
        },
        get: {
            description: 'Get the spotofy playlist info by id',
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
            description: 'Get the spotofy playlist tracks by id',
            returns: 'Promise<any[]>',
            parameters: [
                [
                    'id',
                    'string',
                    'Id of the spotify playlist'
                ],
                [
                    'options',
                    '{ limit?: number, advanced?: boolean }',
                    'Options to help your data collection better!',
                    true
                ]
            ]
        },
    },
    Album: {
        config: {
            description: 'Methods related to Spotify Albums'
        },
        token: {
            description: "Your auth token",
            type: "string"
        },
        search: {
            description: 'Search playlists',
            returns: 'Promise<any[]>',
            parameters: [
                [
                    'q',
                    'string',
                    'Query to search'
                ],
                [
                    'options',
                    '{ limit?: number, advanced?: boolean }',
                    'Options to help your data collection better!',
                    true
                ]
            ]
        },
        get: {
            description: 'Get playlist info by id',
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
            description: 'Get playlist tracks by id',
            returns: 'Promise<any>',
            parameters: [
                [
                    'id',
                    'string',
                    'Id of the album'
                ],
                [
                    'options',
                    '{ limit?: number, advanced?: boolean }',
                    'Options to help your data collection better!',
                    true
                ]
            ]
        }
    },
    Track: {
        config: {
            description: 'Methods related to Spotify Tracks'
        },
        token: {
            description: "Your auth token",
            type: "string"
        },
        search: {
            description: 'Search tracks',
            returns: 'Promise<any[]>',
            parameters: [
                [
                    'q',
                    'string',
                    'Query to search'
                ],
                [
                    'options',
                    '{ limit?: number, advanced?: boolean }',
                    'Options to help your data collection better!',
                    true
                ]
            ]
        },
        get: {
            description: 'Get track info by id',
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
            description: 'Get audio features of the track by id.',
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
            description: 'Audio Analysis of a track by its id.',
            returns: 'Promise<any>',
            parameters: [
                [
                    'id',
                    'string',
                    'Id of the track'
                ]
            ]
        }
    },
    Artist: {
        config: {
            description: 'Methods related to Spotify Artists'
        },
        token: {
            description: "Your auth token",
            type: "string"
        },
        search: {
            description: 'Search artists',
            returns: 'Promise<any[]>',
            parameters: [
                [
                    'q',
                    'string',
                    'Query to search'
                ],
                [
                    'options',
                    '{ limit?: number, advanced?: boolean }',
                    'Options to help your data collection better!',
                    true
                ]
            ]
        },
        get: {
            description: 'Get artist info by id.',
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
            description: 'Get list of albums by the Spotify Artist by the artist id',
            returns: 'Promise<any[]>',
            parameters: [
                [
                    'id',
                    'string',
                    'Id of the artist'
                ],
                [
                    'options',
                    '{ limit?: number, advanced?: boolean }',
                    'Options to help your data collection better!',
                    true
                ]
            ]
        },
        topTracks: {
            description: 'Get top tracks of the Spotify Artist by the artist id',
            returns: 'Promise<any[]>',
            parameters: [
                [
                    'id',
                    'string',
                    'Id of the artist'
                ],
                [
                    'options',
                    '{ limit?: number, advanced?: boolean }',
                    'Options to help your data collection better!',
                    true
                ]
            ]
        },
        relatedArtists: {
            description: 'Get list of related artists of the Spotify Artist by the artist id',
            returns: 'Promise<any[]>',
            parameters: [
                [
                    'id',
                    'string',
                    'Id of the artist'
                ],
                [
                    'options',
                    '{ limit?: number, advanced?: boolean }',
                    'Options to help your data collection better!',
                    true
                ]
            ]
        },
    }
}