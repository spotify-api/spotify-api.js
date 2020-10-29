/**
 * File where all errors exists. Custom errors are used to help users to know what error they are facing...
 */

class UtilityError extends Error{
    
    name: string;

    /**
     * @param message Error message
     * 
     * This error occurs on the uitlity side (Spotify.ts)
     */
    constructor(message: string) {
        super(message);
        this.name = 'UtilityError';
    };

};

class MissingParamError extends Error{

    name: string;

    /**
     * @param message Error message
     * 
     * This error occurs when you miss to give a required param!
     */
    constructor(message: string) {
        super(message);
        this.name = 'MissingParamError';
    };

};

class UnexpectedError extends Error{

    name: string;

    /**
     * @param message Error message
     * 
     * This error mostly occurs when the spotify api responses an invalid json format or you have been rate limited!
     * You can view up all the spotify web api responses, request types, etc [here](https://developer.spotify.com/documentation/web-api/)
     */
    constructor(res: any) {
        super(res.response ? JSON.stringify(res.response.data) : res);
        this.name = 'UnexpectedError';
    };

};

export {
    UtilityError,
    MissingParamError,
    UnexpectedError
};