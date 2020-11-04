/**
 * Search file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";

/**
 * Search through various mediums!
 * 
 * @param token Your oauth token
 */
export default (token: string): any => {
    const Util = new Spotify(token);

    return async (
        q: string, 
        options?: {
            limit?: number,
            type?: ('track' | 'artist' | 'album')[]
        }
    ): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            if(!q) reject(new MissingParamError('missing query'));
            if(!options) options = {};
            if(!Array.isArray(options.type)) options.type = ['track', 'artist', 'album'];

            try{
                resolve(
                    await Util.fetch({
                        link: `v1/search`,
                        params: {
                            q: encodeURIComponent(q),
                            type: options.type.join(','),
                            market: "US",
                            limit: options.limit || 20,
                        },
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });
    };
};