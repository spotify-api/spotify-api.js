/**
 * Artist lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";

/**
 * Class of all methods related to artists
 */
class Artist extends Spotify {

    /**
     * **Example:**
     * ```js
     * const artist = await spotify.artists.search("alec benjamin", { limit: 1 }); // Searches for the artist with a default limit as 1...
       const advanced = await spotify.artists.search("alec benjamin", {
           limit: 1,
           advanced: true,
       }); // Returns a `dominantColor` and `codeImage` key with the response..
     * ```
     *
     * @param q Your search query
     * @param options Options to configure your search
     */
    async search(
        q: string,
        options?: {
            limit?: null | string | number;
            advanced?: boolean;
        }
    ): Promise<any> {

        return new Promise(async (resolve, reject) => {
            if (!q) reject(new MissingParamError("missing query"));
            if (!options) options = {};

            try {
                const res = await this.fetch({
                    link: `v1/search`,
                    params: {
                        q,
                        type: "artist",
                        market: "US",
                        limit: options.limit || 20,
                    },
                });

                let items = res.artists.items;

                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    }
                }

                resolve(items);
            } catch (e) {
                reject(new UnexpectedError(e));
            }
        });

    };

    /**
     * **Example:**
     * ```js
     * const artist = await spotify.artists.get("artist id"); // Get artists by id. Has advanced option too...
     * ```
     * 
     * @param id Id of the artist
     */
    async get(id: string): Promise<any> {

        return new Promise(async (resolve, reject) => {
            if (!id) reject(new MissingParamError("missing id"));

            try {
                const data = await this.fetch({
                    link: `v1/artists/${id}`,
                });

                const codeImage = await this.getCodeImage(data.uri);
                data.codeImage = codeImage.image;
                data.dominantColor = codeImage.dominantColor;

                resolve(data);
            } catch (e) {
                reject(new UnexpectedError(e));
            }
        });

    }

    /**
     * **Example:**
     * ```js
     * const albums = await spotify.artists.getAlbums("artist id"); // Get albums of the artists by id. Has advanced and limit option too...
     * ```
     * @param id Id of the artist
     * @param options Options to configure your search
     */
    async getAlbums(
        id: string,
        options?: {
            limit?: null | string | number;
            advanced?: boolean;
        }
    ): Promise<any> {

        return new Promise(async (resolve, reject) => {
            if (!id) reject(new MissingParamError("missing id"));
            if (!options) options = {};

            try {
                const res = await this.fetch({
                    link: `v1/artists/${id}/albums`,
                    params: {
                        limit: options.limit || 20,
                        market: "US",
                        include_groups: "single",
                    },
                });

                let items = res.items;

                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    }
                }

                resolve(items);
            } catch (e) {
                reject(new UnexpectedError(e));
            }
        });

    }

    /**
     * **Example:**
     * ```js
     * const topTracks = await spotify.artists.topTracks("artist id"); // Returns top tracks of the artist. Has advanced and limit option too...
     * ```
     * 
     * @param id Id of the artist
     * @param options Options to configure your search
     */
    async topTracks(
        id: string,
        options?: {
            limit?: null | string | number;
            advanced?: boolean;
        }
    ): Promise<any> {

        return new Promise(async (resolve, reject) => {
            if (!id) reject(new MissingParamError("missing id"));
            if (!options) options = {};

            try {
                const res = await this.fetch({
                    link: `v1/artists/${id}/top-tracks`,
                    params: {
                        country: "US",
                    },
                });

                let items = res.tracks;

                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    }
                }

                resolve(items);
            } catch (e) {
                reject(new UnexpectedError(e));
            }
        });

    };

    /**
     * **Example:**
     * ```js
     * const relatedArtists = await spotify.artists.relatedArtists("artist id"); // Returns related artists. Has advanced and limit option too...
     * ```
     * 
     * @param id Id of the artist
     * @param options Options to configure your search
     */
    async relatedArtists(
        id: string,
        options?: {
            advanced?: boolean;
        }
    ): Promise<any> {

        return new Promise(async (resolve, reject) => {
            if (!id) reject(new MissingParamError("missing id"));
            if (!options) options = {};

            try {
                const res = await this.fetch({
                    link: `v1/artists/${id}/related-artists`,
                    params: {
                        country: "US",
                    },
                });

                let items = res.artists;

                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    }
                }

                resolve(items);
            } catch (e) {
                reject(new UnexpectedError(e));
            }
        });

    };

};

export default Artist;