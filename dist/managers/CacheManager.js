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
            useroptions = {
                profile: true
            };
        }
        if (useroptions.profile) {
            await client.user.me();
        }
    }
    client.onReady();
}
exports.default = manageCache;
