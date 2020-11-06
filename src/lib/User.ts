/**
 * User lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import axios from "axios";
import Spotify from "../Spotify";

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
    async get(id: string): Promise<any> {

        return new Promise(async (resolve, reject) => {
            try {
                if(!id) reject(new MissingParamError("missing id to fetch user"));

                const res = await this.fetch({
                    link: `v1/users/${id}`,
                });

                res.codeImage = `https://scannables.scdn.co/uri/plain/jpeg/e8e6e6/black/1080/${res.uri}`;
                resolve(res);
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
    async getPlaylists(id: string): Promise<any> {

        return new Promise(async (resolve, reject) => {
            try {
                if(!id) reject(new MissingParamError("missing id to fetch user"));

                const res = await this.fetch({
                    link: `v1/users/${id}/playlists`,
                });

                resolve(res);
            } catch (e) {
                reject(new UnexpectedError(e));
            };
        });

    };

};

export default User;
