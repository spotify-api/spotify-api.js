import { AxiosError, AxiosResponse } from "axios";
/**
 * File where all errors exists. Custom errors are used to help users to know what error they are facing...
 */
export declare class UtilityError extends Error {
    name: string;
    /**
     * This error occurs on the uitlity side
     *
     * @param message Error message
     */
    constructor(message: string);
}
export declare class UnexpectedError extends Error {
    name: string;
    response?: AxiosResponse;
    isSpotifyError: boolean;
    /**
     * This error mostly occurs when the spotify api responses an invalid json format or you have been rate limited!
     * You can view up all the spotify web api responses, request types, etc [here](https://developer.spotify.com/documentation/web-api/)
     *
     * @param message Error message
     */
    constructor(res: any);
}
/**
 * A method to handle error which are thrown by axios only else will directly throw error too!
 *
 * @param e Axios error object
 * @warning Not for direct use!
 */
export declare function handleError(e: AxiosError): null | never;
