module.exports = {
    SearchOptions: {
        description: 'Search options object structure.',
        parameters: [
            [
                'limit',
                'number',
                'Limit of results',
                true
            ],
            [
                'type',
                'string[]',
                'Type of search',
                true
            ]
        ]
    },
    AuthGetOptions: {
        description: 'Auth.get options object structure.',
        parameters: [
            [
                'client_id',
                'string',
                'Your spotify app client id'
            ],
            [
                'client_secret',
                'string',
                'Your spotify app client secret'
            ]
        ]
    },
    AuthBuildOptions: {
        description: 'Auth.build options object structure.',
        parameters: [
            [
                'client_id',
                'string',
                'Your spotify app client id'
            ],
            [
                'redirect_uri',
                'string',
                'Url where the user will be redirect after the login'
            ],
            [
                'scopes',
                'string',
                'The scopes you need from the user while authorizing in a string in the format of "scope1 scope2"',
                true
            ]
        ]
    },
    AuthRefreshOptions: {
        description: 'Auth.refresh options object structure.',
        parameters: [
            [
                'client_id',
                'string',
                'Your spotify app client id'
            ],
            [
                'client_secret',
                'string',
                'Your spotify app client secret'
            ],
            [
                'code',
                'string',
                'Code query sent by the spotify authorization. You can use the refresh_token also to get a new access_token.'
            ],
            [
                'redirect_uri',
                'string',
                'This redirect uri would not actually redirect you. This is only for validation. You need to enter the same uri/url used in the authorization link or Auth.build'
            ]
        ]
    },
    AuthRefresh: {
        description: 'Object structure returned by Auth.refresh.',
        parameters: [
            [
                'access_token',
                'string',
                'User access token'
            ],
            [
                'token_type',
                'string',
                'Type of the token'
            ],
            [
                'expires_in',
                'number',
                'Time in which the access_token expires'
            ],
            [
                'refresh_token',
                'string',
                'Token which you can use to refresh in options.code and get a new token using Auth.refresh method'
            ],
            [
                'scope',
                'string',
                'Authorization scopes you have requested'
            ]
        ]
    },
    FetchOptions: {
        description: 'Util.fetch options object structure.',
        parameters: [
            [
                'link',
                'string',
                'Link after https://api.spotify.com/'
            ],
            [
                'params',
                'object',
                'All the query parameters in object form',
                true
            ],
            [
                'headers',
                'object',
                'Additional headers than Authorization header',
                true
            ],
            [
                'method',
                'string',
                'By default the fetch methods uses GET method. You can set your own method',
                true
            ]
        ]
    },
};