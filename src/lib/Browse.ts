/**
 * Browsing lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import { Category, FeaturedPlaylistReturn } from "../structures/Interface";
import Spotify from "../Spotify";
import Client from "../Client";
import Playlist from "../structures/Playlist";
import Album from "../structures/Album";

/**
 * Class of all methods related to browse endpoints
 */
class Browse extends Spotify{

    client: Client;

    constructor(token: string, client: Client){
        super(token);
        this.client = client;
    }

    /**
     * Get information about a category by id
     * 
     * @param id category id
     * @param force If true, will fetch else will try to fetch from cache!
     */
    async getCategory(id: string, force: boolean = false): Promise<Category> {
        
        if(!id) throw new MissingParamError('missing id');
        if(!force){
            let existing = this.client.cache.categories.get(id);
            if(existing) return existing;
        }

        try{
            const data = await this.fetch({ link: `v1/browse/categories/${id}` });
            if(this.client.cacheOptions.cacheCategories) this.client.cache.categories.push(data);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

    /**
     * Returns all playlists of the category by id
     * @param id Id of the category
     * @param limit Limit of results
     */
    async getCategoryPlaylists(id: string, options: { limit?: number; params?: any; } = { limit: 20 }): Promise<Playlist[]> {
        
        if(!id) throw new MissingParamError('missing id');

        try{
            const data = await this.fetch({
                link: `v1/browse/categories/${id}/playlists`,
                params: {
                    limit: options.limit,
                    ...options.params
                }
            });

            let items = data.playlists.items.map(x => new Playlist(x, this.client));
            if(this.client.cacheOptions.cachePlaylists) this.client.cache.playlists.push(...items);
            return items;
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

    /**
     * Get list of all categories
     * 
     * @param options option object such as limit and params
     */
    async categories(options: { limit?: number; params?: any; } = { limit: 20 }): Promise<Category[]> {
        
        try{
            const data = await this.fetch({
                link: `v1/browse/categories`,
                params: {
                    limit: options.limit,
                    ...options.params
                }
            });

            if(this.client.cacheOptions.cacheCategories) this.client.cache.categories.push(...data);
            return data.categories.items;
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

    /**
     * Get list of all featured playlists
     * 
     * @param options Option object such as limit, advanced and params
     */
    async featuredPlaylists(options: { limit?: number; params?: any; } = { limit: 20 }): Promise<FeaturedPlaylistReturn> {
        
        try{
            const data = await this.fetch({
                link: `v1/browse/featured-playlists`,
                params: {
                    limit: options.limit,
                    ...options.params
                }
            });

            return {
                message: data.message,
                playlists: data.playlists.items.map(x => new Playlist(x, this.client))
            };
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

    /**
     * Get list of all new releases
     * @param options options object such as limit advanced and params
     */
    async newReleases(options: { limit?: number; params?: any; } = { limit: 20 }): Promise<Album[]> {
        
        try{
            const data = await this.fetch({
                link: `v1/browse/new-releases`,
                params: {
                    limit: options.limit,
                    ...options.params
                }
            });

            let items = data.albums.items.map(x => new Album(x, this.client));
            if(this.client.cacheOptions.cacheAlbums) this.client.cache.albums.push(...items);
            return items;
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

};

export default Browse;