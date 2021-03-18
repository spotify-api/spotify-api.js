"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This method is used to manage cache for your client!
 *
 * @param client Your spotify client
 */
async function manageCache(client) {
    const options = client.cacheOptions;
    if (options.cacheCurrentUser) {
        var useroptions = options.cacheCurrentUser;
        if (useroptions == true) {
            await client.user.info();
        }
        else {
            await client.user.info();
            if (useroptions.affinity == true) {
                await client.user.getTopTracks();
                await client.user.getTopArtists();
            }
            else if (typeof useroptions.affinity == 'object') {
                if (useroptions.affinity.artists)
                    await client.user.getTopArtists();
                else if (useroptions.affinity.tracks)
                    await client.user.getTopTracks();
            }
        }
    }
    client.onReady();
}
exports.default = manageCache;
