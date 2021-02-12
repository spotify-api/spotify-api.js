/**
 * Episode Manager file
 */
import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import Client from "../Client";
import Episode from "../structures/Episode"

/**
 * Class of all Spotify Api Methods related to episodes!
 */
export default class EpisodeManager extends Spotify{

    client: Client;

    /**
     * Class of all Spotify Api Methods related to episodes!
     * 
     * @param client Your Spotify Client
     */
    constructor(client: Client){
        super(client.token);
        this.client = client;
    }

    /**
     * Search episodes efficiently!
     * 
     * @param q Your query
     * @param options Options such as limit and params
     * @example const [episode] = await spotify.episodes.search("search", { limit: 1 }); // Returns the very first search
     */
    async search(q: string, options: { limit?: number; params?: any; } = { limit: 20 }): Promise<Episode[]> {

        if(!q) throw new MissingParamError("missing query!");

        try{
            const data = await this.fetch({
                link: "v1/search",
                params: {
                    q,
                    market: "US",
                    limit: options.limit,
                    type: "episode",
                    ...options.params
                },
            });

            let items = data.episodes.items.map(x => new Episode(x, this.client));
            if(this.client.cacheOptions.cacheEpisodes) this.client.cache.episodes.push(...items);
            return items;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Returns the information of the Spotify Episode by its id!
     * 
     * @param id Id of the episode
     * @param force If true, will force fetch else will search first in cache!
     * @example const episode = await spotify.episodes.get('id'); // Returns the episode information by id
     */
    async get(id: string, force: boolean = false): Promise<Episode> {

        if(!id) new MissingParamError('missing id');
        if(!force){
            let existing = this.client.cache.episodes.get(id);
            if(existing) return existing;
        }
            
        try{
            const data = new Episode(await this.fetch({ link: `v1/episodes/${id}` }), this.client);
            if(this.client.cacheOptions.cacheEpisodes) this.client.cache.episodes.push(data);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

};