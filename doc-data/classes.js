module.exports = {
    Client: {
        description: 'Spotify client.',
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
                description: "Returns new auth class",
                type: 'Auth',
                href: 'https://spotify-api-js-test.netlify.app/#/class/auth'
            },
            albums: {
                description: "Returns new album class",
                type: 'Album',
                href: 'https://spotify-api-js-test.netlify.app/#/class/album'
            },
            artists: {
                description: "Returns new artist class",
                type: 'Artist',
                href: 'https://spotify-api-js-test.netlify.app/#/class/artist'
            },
            playlists: {
                description: "Returns new playlist class",
                type: 'Playlist',
                href: 'https://spotify-api-js-test.netlify.app/#/class/playlist'
            },
            tracks: {
                description: "Returns new track class",
                type: 'Track',
                href: 'https://spotify-api-js-test.netlify.app/#/class/track'
            },
            users: {
                description: "User class",
                type: 'User',
                href: 'https://spotify-api-js-test.netlify.app/#/class/user'
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