/**
 * Browsing lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";

/**
 * Class of all methods related to browse enpoints
 */
class Browse extends Spotify{

    /**
     * Get information about a category by id
     * @param id category id
     */
    async getCategory(id: string): Promise<any> {
        
        return new Promise(async (resolve, reject) => {
            if(!id) reject(new MissingParamError('missing id'));

            try{
                resolve(
                    await this.fetch({
                        link: `v1/browse/categories/${id}`,
                    })
                );
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
    async getCategoryPlaylists(id: string, limit?: number): Promise<any> {
        
        return new Promise(async (resolve, reject) => {
            if(!id) reject(new MissingParamError('missing id'));

            try{
                const data = await this.fetch({
                    link: `v1/browse/categories/${id}/playlists`,
                    params: {
                        limit: limit || 20
                    }
                })

                resolve(data.playlists);
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    /**
     * Get list of all categories
     * @param limit Limit of your results
     */
    async categories(limit?: number): Promise<any> {
        
        return new Promise(async (resolve, reject) => {
            try{
                const data = await this.fetch({
                    link: `v1/browse/categories`,
                    params: {
                        limit: limit || 20
                    }
                });

                resolve(data.categories.items);
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    /**
     * Get list of all featured playlists
     * @param limit Limit of results
     */
    async featuredPlaylists(limit?: number): Promise<any> {
        
        return new Promise(async (resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        link: `v1/browse/featured-playlists`,
                        params: {
                            limit: limit || 20
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    /**
     * Get list of all new releases
     * @param limit Limit of results
     */
    async newReleases(limit?: number): Promise<any> {
        
        return new Promise(async (resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        link: `v1/browse/new-releases`,
                        params: {
                            limit: limit || 20
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

};

export default Browse;