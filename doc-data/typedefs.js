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
    }
};