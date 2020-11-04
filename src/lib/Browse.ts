/**
 * Browsing lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";

class Browse extends Spotify{

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

    async getCategoryPlaylists(id: string, limit?: number): Promise<any> {
        
        return new Promise(async (resolve, reject) => {
            if(!id) reject(new MissingParamError('missing id'));

            try{
                resolve(
                    await this.fetch({
                        link: `v1/browse/categories/${id}/playlists`,
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

    async categories(limit?: number): Promise<any> {
        
        return new Promise(async (resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        link: `v1/browse/categories`,
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