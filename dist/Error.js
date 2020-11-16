"use strict";
/**
 * File where all errors exists. Custom errors are used to help users to know what error they are facing...
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedError = exports.MissingParamError = exports.UtilityError = void 0;
class UtilityError extends Error {
    /**
     * This error occurs on the uitlity side (Spotify.ts)
     *
     * @param message Error message
     */
    constructor(message) {
        super(message);
        this.name = 'UtilityError';
    }
    ;
}
exports.UtilityError = UtilityError;
;
class MissingParamError extends Error {
    /**
     * This error occurs when you miss to give a required param!
     *
     * @param message Error message
     */
    constructor(message) {
        super(message);
        this.name = 'MissingParamError';
    }
    ;
}
exports.MissingParamError = MissingParamError;
;
class UnexpectedError extends Error {
    /**
     * This error mostly occurs when the spotify api responses an invalid json format or you have been rate limited!
     * You can view up all the spotify web api responses, request types, etc [here](https://developer.spotify.com/documentation/web-api/)
     *
     * @param message Error message
     */
    constructor(res) {
        super(res.response ? JSON.stringify(res.response.data) : res);
        this.name = 'UnexpectedError';
    }
    ;
}
exports.UnexpectedError = UnexpectedError;
;
//# sourceMappingURL=Error.js.map