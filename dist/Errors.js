"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.UnexpectedError = exports.UtilityError = void 0;
/**
 * File where all errors exists. Custom errors are used to help users to know what error they are facing...
 */
class UtilityError extends Error {
    /**
     * This error occurs on the uitlity side
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
/**
 * A method to handle error which are thrown by axios only else will directly throw error too!
 *
 * @param e Axios error object
 * @warning Not for direct use!
 */
function handleError(e) {
    if (e.response && e.response.status == 404)
        return null;
    else
        throw new UnexpectedError(e);
}
exports.handleError = handleError;
