import { handleError } from "../Errors";
import { Category, Paging, PagingOptions, RawObject } from "../Types";
import Playlist from "../structures/Playlist";
import Album from "../structures/Album";
import BaseManager from "./BaseManager";

/**
 * Return object structure by BrowseManager.getFeatured();
 */
export interface FeaturedPlaylists{
    readonly playlists: Paging<Playlist>;
    message: string;
}

/**
 * All browse api endpoint methods!
 */
export default class BrowseManager extends BaseManager{

    /**
     * Returns the spotify category by id
     * 
     * @param id ID of the spotify category
     * @param force If true, it will attempt to search cache if available
     * @example await client.browse.getCategory('party'); 
     */
    async getCategory(id: string, force: boolean = !this.client.cacheOptions.cacheCategories): Promise<Category | null> {

        try{
            if(!force){
                let existing = this.client.cache.categories.get(id);
                if(existing) return existing;
            }

            const category = await this.fetch(`/browse/categories/${id}`) as Category;
            if(this.client.cacheOptions.cacheCategories) this.client.cache.categories.set(category.id, category);
            return category;
        }catch(e){
            return handleError(e);
        }

    }

    /**
     * Returns an array of spotify categories
     * 
     * @param options Basic PagingOptions
     * @example client.browse.getCategories()
     */
    async getCategories(options?: PagingOptions): Promise<Paging<Category>> {

        try{
            const data = (await this.fetch('/browse/categories', { params: options })).categories;
            const categories = data.items as Category[];

            if(this.client.cacheOptions.cacheCategories){
                for(let i = 0; i < categories.length; i++) this.client.cache.categories.set(categories[i].id, categories[i]);
            }

            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: categories
            };
        }catch(e){
            return handleError(e) || {
                limit: 0,
                offset: 0,
                total: 0,
                items: []
            };
        }

    }

    /**
     * Returns an array of playlists of the category!
     * 
     * @param id Spotify id of the category
     * @param options Options such as limit and offset
     * @example client.browse.getCategoryPlaylists('party');
     */
    async getCategoryPlaylists(id: string, options?: PagingOptions): Promise<Paging<Playlist>> {

        try{
            const data = (await this.fetch(`/browse/categories/${id}/playlists`, { params: options as RawObject })).playlists;
            const playlists = data.items.map(x => new Playlist(x, this.client)) as Playlist[];

            if(this.client.cacheOptions.cachePlaylists){
                for(let i = 0; i < playlists.length; i++) this.client.cache.playlists.set(playlists[i].id, playlists[i]);
            }

            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: playlists
            };
        }catch(e){
            return handleError(e) || {
                limit: 0,
                offset: 0,
                total: 0,
                items: []
            };
        }

    }

    /**
     * Returns the featured playlists of the spotify
     * 
     * @param options Options such as limit and offset
     * @example client.browse.getFeaturedPlaylists();
     */
    async getFeaturedPlaylists(options?: PagingOptions): Promise<FeaturedPlaylists | null> {

        try{
            const data = (await this.fetch('/browse/featured-playlists', { params: options })).playlists;
            const client = this.client;

            return {
                message: data.message,
                get playlists(){
                    return {
                        limit: data.limit,
                        offset: data.offset,
                        total: data.total,
                        items: data.items.map(x => new Playlist(x, client))
                    } 
                }
            }
        }catch(e){
            return handleError(e);
        }

    }

    /**
     * Returns new releases of albums on spotify
     * 
     * @param options Basic PagingOptions
     * @example await client.browse.getNewReleases();
     */
    async getNewReleases(options?: PagingOptions): Promise<Paging<Album>> {

        try{
            const data = (await this.fetch('/browse/new-releases', { params: options })).albums;
            const albums = data.items.map(x => new Album(x, this.client));

            if(this.client.cacheOptions.cacheAlbums){
                for(let i = 0; i < albums.length; i++) this.client.cache.albums.set(albums[i].id, albums[i]);
            }

            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: albums
            };
        }catch(e){
            return handleError(e) || {
                limit: 0,
                offset: 0,
                total: 0,
                items: []
            };
        }

    }

    /**
     * Returns all markets present in spotify!
     * 
     * @example await client.browse.getAllMarkets();
     */
    async getMarkets(): Promise<string[]> {

        try{
            return (await this.fetch('/markets')).markets;
        }catch(e){
            return handleError(e) || [];
        }

    }

    /**
     * Returns recommended genres!
     * 
     * @example await client.browse.getRecommendedGenres();
     */
    async getRecommendedGenres(): Promise<string[]> {

        try{
            return (await this.fetch('/recommendations/available-genre-seeds')).genres;
        }catch(e){
            return handleError(e) || [];
        }

    }

};

export type { Category };