import Show from "../structures/Show";
import { handleError, UnexpectedError } from "../Errors";
import { GetMultipleOptions, Paging, PagingOptions, RawObject, SearchOptions } from "../Types";
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
     async search(query: string, options: Omit<SearchOptions, 'type'>): Promise<Paging<Show>> {

        try{
            const data = (await this.fetch('/search', {
                params: {
                    ...options,
                    type: 'show',
                    q: query
                }
            })).shows;

            const shows = data.items.map(x => new Show(x, this.client));

            if(this.client.cacheOptions.cacheShows){
                for(let i = 0; i < shows.length; i++) this.client.cache.shows.set(shows[i].id, shows[i]);
            }

            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: shows
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
     * Get multiple shows at one fetch!
     * 
     * @param options Basic GetMultipleOptions
     * @example await client.shows.getMultiple({
     *     ids: ['123456789']
     * })
     */
     async getMultiple(options: GetMultipleOptions): Promise<Show[]> {

        try{
            const def = { market: 'US', ids: [] as any };
            Object.assign(def, options);

            if(!def.ids.length  || def.ids.length > 20) throw new UnexpectedError("You must provide more than 1 and less than 20 ids to fetch multiple shows!");
            def.ids = def.ids.join(',');

            const shows = (await this.fetch('/shows', { 
                params: def
            })).shows.map(x => new Show(x, this.client));

            if(this.client.cacheOptions.cacheShows){
                for(let i = 0; i < shows.length; i++) this.client.cache.shows.set(shows[i].id, shows[i]);
            }

            return shows;
        }catch(e){
            return handleError(e) || [];
        }

    }

    /**
     * Returns the episodes of the show by id!
     * 
     * @param id Spotify show id
     * @param options Basic PagingOptions
     * @example await client.shows.getEpisodes('id');
     */
    async getEpisodes(id: string, options: PagingOptions = { market: 'US' }): Promise<Paging<Episode>> {

        try{
            const data = (await this.fetch(`/shows/${id}/episodes`, { params: options as RawObject }));
            const episodes = data.items.map(x => new Episode(x, this.client)) as Episode[];

            if(this.client.cacheOptions.cacheShows){
                for(let i = 0; i < episodes.length; i++) this.client.cache.episodes.set(episodes[i].id, episodes[i]);
            }

            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: episodes
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

}

export type { Show };