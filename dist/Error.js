"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyAPIError = void 0;
/**
 * This error mostly occurs when the spotify api responses an invalid json format!
 * You can view up all the spotify web api responses, request types, etc [here](https://developer.spotify.com/documentation/web-api/)
 */
class SpotifyAPIError extends Error {
    /**
     * This error mostly occurs when the spotify api responses an invalid json format!
     * You can view up all the spotify web api responses, request types, etc [here](https://developer.spotify.com/documentation/web-api/)
     *
     * @param message Error message or axios response.
     */
    constructor(response) {
        if (typeof response == "string")
            super(response);
        else {
            super(JSON.stringify(response.response.data));
            this.response = response.response;
        }
        this.name = 'SpotifyAPIError';
    }
    ;
}
exports.SpotifyAPIError = SpotifyAPIError;
;
