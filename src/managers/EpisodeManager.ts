import { handleError } from "../Errors";
import Episode from "../structures/Episode";
import { SearchOptions } from "../Types";
import BaseManager from "./BaseManager";

/**
 * A class which manages the episodes
 */
export default class EpisodeManager extends BaseManager{

    /**
     * Search episodes!
     * 
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.episodes.search('some query');
     */
     async search(query: string, options: Omit<SearchOptions, 'type'>): Promise<Episode[]> {

        try{
            const episodes = (await this.fetch('/search', {
                params: {
                    ...options,
                    type: 'episode',
                    q: query
                }
            })).episodes.items.map(x => new Episode(x, this.client));

            if(this.client.cacheOptions.cacheEpisodes){
                for(let i = 0; i < episodes.length; i++) this.client.cache.episodes.set(episodes[i].id, episodes[i]);
            }

            return episodes;
        }catch(e){
            return handleError(e) || [];
        }

    }

    /**
     * Get a spotify episode information by spotify id!
     * 
     * @param id Spotify episode id
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where we need to fetch the details!
     * @example await client.episodes.get('id');
     */
    async get(id: string, force: boolean = !this.client.cacheOptions.cacheEpisodes, market: string = 'US'): Promise<Episode | null> {

        try{
            if(!force){
                let existing = this.client.cache.episodes.get(id);
                if(existing) return existing;
            }

            const episode = new Episode(await this.fetch(`/episodes/${id}`, {
                params: { market }
            }), this.client);

            if(this.client.cacheOptions.cacheEpisodes) this.client.cache.episodes.set(id, episode);
            return episode;
        }catch(e){
            return handleError(e);
        }

    }

}

export type { Episode };