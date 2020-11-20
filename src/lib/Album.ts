/**
 * Album lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import AlbumStructure from '../structures/Album';
import SimplifiedTrack from "../structures/SimplifiedTrack";

/**
 * Class of all methods related to albums
 */
class Album extends Spotify {

    /**
     * **Example:**
     * ```js
     * const album = await spotify.albums.search("these two windows", { limit: 1 }); // Searches for an album. Has advanced option too...
     * ```
     * 
     * @param q Your query
     * @param options Your options such as limit, advanced, etc
     */
    async search(
        q: string,
        options?: {
            limit?: string | null | number;
            advanced?: boolean;
        }
    ): Promise<any> {

        return new Promise(async (resolve, reject) => {
            if (!q) throw new MissingParamError("missing query!");
            if (!options) options = {};

            try {
                const res = await this.fetch({
                    link: "v1/search",
                    params: {
                        q: encodeURIComponent(q),
                        market: "US",
                        limit: options.limit || 20,
                        type: "album",
                    },
                });

                let items = res.albums.items;

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
     * const album = await spotify.albums.get("album id"); // Get album by id...
     * ```
     * 
     * @param id Id of the album
     */
    async get(id: string): Promise<AlbumStructure> {

        return new Promise(async (resolve, reject) => {
            if (!id) reject(new MissingParamError("missing id"));

            try {
                resolve(
                    new AlbumStructure(
                        await this.fetch({
                            link: `v1/albums/${id}`,
                        })
                    )
                );
            } catch (e) {
                reject(new UnexpectedError(e));
            }
        });

    };

    /**
     * **Example:**
     * ```js
     * const tracks = await spotify.albums.getTracks("album id", { limit: 5 }); // Get all tracks of an album. Has advanced option too...
     * ```
     * 
     * @param id Id of the song
     * @param options Options such as limit and advanced
     */
    async getTracks(
        id: string,
        options?: {
            limit?: string | null | number;
            advanced?: boolean;
        }
    ): Promise<SimplifiedTrack[]> {

        return new Promise(async (resolve, reject) => {
            if (!id) reject(new MissingParamError("missing id!"));
            if (!options) options = {};

            try {
                const res = await this.fetch({
                    link: `v1/albums/${id}/tracks`,
                    params: {
                        limit: options.limit || 20,
                        market: "US",
                        offset: "0",
                    },
                });

                let items = res.items.map(x => new SimplifiedTrack(x));

                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    };
                };

                resolve(items);
            } catch (e) {
                reject(new UnexpectedError(e));
            };

        });
    };

};

export default Album;