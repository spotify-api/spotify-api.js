const tester = require('./tester');

module.exports = (client) => {
    // Get a category
    tester('Get a category', async () => await client.browse.getCategory('party'), {
        check: Boolean
    }); 

    // Get all catergories
    tester('Get all categories', async () => await client.browse.getCategories(), {
        check: Array.isArray
    });

    // Get playlists of category
    tester('Get playlist categories', async () => await client.browse.getCategoryPlaylists('party'), {
        check: Array.isArray
    });

    // Get featured playlists
    tester('Get featured playlists', async () => await client.browse.getFeaturedPlaylists(), {
        check: x => typeof x.message == 'string' && Array.isArray(x.playlists)
    });

    // Get new releases
    tester('Get new releases', async () => await client.browse.getNewReleases(), {
        check: Array.isArray
    });

    // Get all markets
    tester('Get all markets', async () => await client.browse.getMarkets(), {
        check: Array.isArray
    })
}