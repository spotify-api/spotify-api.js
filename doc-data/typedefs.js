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
    }
};