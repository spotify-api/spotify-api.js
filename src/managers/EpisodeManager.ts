import { handleError } from "../Errors";
import Episode from "../structures/Episode";
import BaseManager from "./BaseManager";

/**
 * A class which manages the episodes
 */
export default class EpisodeManager extends BaseManager{

    /**
     * Get a spotify episode information by spotify id!
     * 
     * @param id Spotify episode id
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where we need to fetch the details!
     * @warning This method might be broken!
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