/**
 * Browsing lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import SimplifiedPlaylist from "../structures/SimplifiedPlaylist";
import { Category, FeaturedPlaylistReturn } from "../structures/Interface";
import SimplifiedAlbum from "../structures/SimplifiedAlbum";

/**
 * Class of all methods related to browse enpoints
 */
class Browse extends Spotify{

    /**
     * Get information about a category by id
     * @param id category id
     */
    async getCategory(id: string): Promise<Category> {
        
        return new Promise(async (resolve, reject) => {
            if(!id) reject(new MissingParamError('missing id'));

            try{
                resolve(await this.fetch({ link: `v1/browse/categories/${id}` }));
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    /**
     * Returns all playlists of the category by id
     * @param id Id of the category
     * @param limit Limit of results
     */
    async getCategoryPlaylists(
        id: string,
        options: {
            limit?: number;
            advanced?: boolean;
            params?: any;
        } = {
            limit: 20
        }
    ): Promise<SimplifiedPlaylist[]> {
        
        return new Promise(async (resolve, reject) => {
            if(!id) reject(new MissingParamError('missing id'));

            try{
                const data = await this.fetch({
                    link: `v1/browse/categories/${id}/playlists`,
                    params: {
                        limit: options.limit,
                        ...options.params
                    }
                });

                let items = data.playlists.items.map(x => new SimplifiedPlaylist(x));

                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    };
                };

                resolve(items);
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    /**
     * Get list of all categories
     * @param limit Limit of your results
     */
    async categories(
        options: {
            limit?: number;
            params?: any;
        } = {
            limit: 20
        }
    ): Promise<Category[]> {
        
        return new Promise(async (resolve, reject) => {
            try{
                let res = await this.fetch({
                    link: `v1/browse/categories`,
                    params: {
                        limit: options.limit,
                        ...options.params
                    }
                });

                resolve(res.categories.items);
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    /**
     * Get list of all featured playlists
     * @param limit Limit of results
     */
    async featuredPlaylists(
        options: {
            limit?: number;
            advanced?: boolean;
            params?: any;
        } = {
            limit: 20
        }
    ): Promise<FeaturedPlaylistReturn> {
        
        return new Promise(async (resolve, reject) => {
            try{
                let data = await this.fetch({
                    link: `v1/browse/featured-playlists`,
                    params: {
                        limit: options.limit,
                        ...options.params
                    }
                });

                resolve({
                    message: data.message,
                    playlists: data.playlists.items.map(x => new SimplifiedPlaylist(x))
                });
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    /**
     * Get list of all new releases
     * @param limit Limit of results
     */
    async newReleases(
        options: {
            limit?: number;
            advanced?: boolean;
            params?: any;
        } = {
            limit: 20
        }
    ): Promise<SimplifiedAlbum[]> {
        
        return new Promise(async (resolve, reject) => {
            try{
                let res = await this.fetch({
                    link: `v1/browse/new-releases`,
                    params: {
                        limit: options.limit,
                        ...options.params
                    }
                });

                let items = res.albums.items.map(x => new SimplifiedAlbum(x));

                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    };
                };

                resolve(items);
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

};

export default Browse;