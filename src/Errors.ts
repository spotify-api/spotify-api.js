import { AxiosError, AxiosResponse } from "axios";

/**
 * File where all errors exists. Custom errors are used to help users to know what error they are facing...
 */

export class UtilityError extends Error{
    
    name: string;

    /**
     * This error occurs on the uitlity side
     * 
     * @param message Error message
     */
    constructor(message: string) {
        super(message);
        this.name = 'UtilityError';
    };

};

export class UnexpectedError extends Error{

    name: string;
    response?: AxiosResponse;
    isSpotifyError: boolean;

    /**
     * This error mostly occurs when the spotify api responses an invalid json format or you have been rate limited!
     * You can view up all the spotify web api responses, request types, etc [here](https://developer.spotify.com/documentation/web-api/)
     * 
     * @param message Error message
     */
    constructor(res) {
        if(res.response){
            super(JSON.stringify(res.response.data));
            this.response = res.response;
        } else {
            super(res);
        }
        
        this.name = 'UnexpectedError';
        this.isSpotifyError = true;
    };

};

/**
 * A method to handle error which are thrown by axios only else will directly throw error too!
 * 
 * @param e Axios error object
 * @warning Not for direct use!
 */
export function handleError(e: AxiosError): null | never {
    if(e.response && e.response.status == 404) return null
    else throw new UnexpectedError(e);
}