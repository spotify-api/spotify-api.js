/**
 * User lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import PublicUser from "../structures/PublicUser";
import SimplifiedPlaylist from "../structures/SimplifiedPlaylist";

/**
 * Class of all methods related to users
 */
class User extends Spotify {

    /**
     * **Example:**
     * ```js
     * const user = await spotify.users.get("id"); // Returns the user details by id...
     * ```
     * 
     * @param id Id of the user
     */
    async get(id: string): Promise<PublicUser> {

        return new Promise(async (resolve, reject) => {
            try {
                if(!id) reject(new MissingParamError("missing id to fetch user"));
                
                resolve(new PublicUser(await this.fetch({ link: `v1/users/${id}` })));
            } catch (e) {
                reject(new UnexpectedError(e));
            };
        });

    };

    /**
     * **Example:**
     * ```js
     * const playlists = await spotify.users.getPlaylists("id"); // Returns the user playlists by id...
     * ```
     * 
     * @param id Id of the user
     */
    async getPlaylists(
        id: string,
        options?: {
            limit?: number;
            advanced?: boolean;
            params?: any;
        }
    ): Promise<SimplifiedPlaylist[]> {

        return new Promise(async (resolve, reject) => {
            try {
                if(!id) reject(new MissingParamError("missing id to fetch user"));
                if(!options) options = { limit: 20 };

                let res = await this.fetch({
                    link: `v1/users/${id}/playlists`,
                    params: {
                        limit: options.limit,
                        ...options.params
                    }
                });

                res = res.items.map(x => new SimplifiedPlaylist(x))

                if(options.advanced){
                    for(let i = 0; i < res.length; i++){
                        let data = await this.getCodeImage(res[i].uri);
                        res[i].codeImage = data.image;
                        res[i].dominantColor = data.dominantColor;
                    };
                };

                resolve(res);
            } catch (e) {
                reject(new UnexpectedError(e));
            };
        });

    };

};

export default User;
