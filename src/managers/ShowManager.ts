import Show from "../structures/Show";
import { handleError } from "../Errors";
import { PagingOptions, RawObject, SearchOptions } from "../Types";
import BaseManager from "./BaseManager";
import Episode from "../structures/Episode";

/**
 * A class which manages the shows
 */
export default class ShowManager extends BaseManager{

    /**
     * Search shows!
     * 
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.shows.search('some query');
     */
     async search(query: string, options: Omit<SearchOptions, 'type'>): Promise<Show[]> {

        try{
            const shows = (await this.fetch('/search', {
                params: {
                    ...options,
                    type: 'show',
                    q: query
                }
            })).shows.items.map(x => new Show(x, this.client));

            if(this.client.cacheOptions.cacheShows){
                for(let i = 0; i < shows.length; i++) this.client.cache.shows.set(shows[i].id, shows[i]);
            }

            return shows;
        }catch(e){
            return handleError(e) || [];
        }

    }

    /**
     * Get a spotify show information by spotify id!
     * 
     * @param id Spotify show id
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where we need to fetch the details!
     * @example await client.shows.get('id');
     */
    async get(id: string, force: boolean = !this.client.cacheOptions.cacheShows, market: string = 'US'): Promise<Show | null> {

        try{
            if(!force){
                let existing = this.client.cache.shows.get(id);
                if(existing) return existing;
            }

            const show = new Show(await this.fetch(`/shows/${id}`, {
                params: { market }
            }), this.client);

            if(this.client.cacheOptions.cacheShows) this.client.cache.shows.set(id, show);
            return show;
        }catch(e){
            return handleError(e);
        }

    }

    /**
     * Returns the episodes of the show by id!
     * 
     * @param id Spotify show id
     * @param options Basic PagingOptions
     * @example client.shows.getEpisodes('id');
     */
    async getEpisodes(id: string, options: PagingOptions = { market: 'US' }): Promise<Episode[]> {

        try{
            const data = (await this.fetch(`/shows/${id}/episodes`, { 
                params: options as RawObject
            })).items.map(x => new Episode(x, this.client)) as Episode[];

            if(this.client.cacheOptions.cacheShows){
                for(let i = 0; i < data.length; i++) this.client.cache.episodes.set(data[i].id, data[i]);
            }

            return data;
        }catch(e){
            return handleError(e) || [];
        }

    }

}

export type { Show };