"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple base manager for spotify-api.js!
 */
class BaseManager {
    /**
     * Simple base manager which get extended in other managers too...
     *
     * @param client Your spotify client
     * @warning Do not use this directly!
     */
    constructor(client) {
        Object.defineProperties(this, {
            client: { value: client },
            fetch: { value: client.util.fetch.bind(client.util) }
        });
    }
}
exports.default = BaseManager;
;
