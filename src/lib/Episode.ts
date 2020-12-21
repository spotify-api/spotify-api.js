/**
 * Episode lib file
 */
import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import Client from "../Client";
import EpisodeStructure from "../structures/Episode"

/**
 * Class of all methods related to episode enpoints
 */
class Episode extends Spotify{

    client: Client;

    constructor(token: string, client: Client){
        super(token);
        this.client = client;
    }

    /**
     * **Example:**
     * ```js
     * const [episode] = await spotify.episodes.search("search", { limit: 1 }); // Returns the very first search
     * ```
     * 
     * @param q Your query
     * @param options Options such as limit, advanced and params
     */
    async search(q: string, options: { limit?: number; params?: any; } = { limit: 20 }): Promise<EpisodeStructure[]> {

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

            let items = data.episodes.items.map(x => new EpisodeStructure(x, this.client));
            if(this.client.cacheOptions.cacheEpisodes) this.client.cache.episodes.push(...items);
            return items;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * const episode = await spotify.episodes.get('id'); // Returns the episode information by id
     * ```
     * 
     * @param id Id of the episode
     * @param options Advanced option
     */
    async get(id: string, force: boolean = false): Promise<EpisodeStructure> {

        if(!id) new MissingParamError('missing id');
        if(!force){
            let existing = this.client.cache.episodes.get(id);
            if(existing) return existing;
        }
            
        try{
            const data = new EpisodeStructure(await this.fetch({ link: `v1/episodes/${id}` }), this.client);
            if(this.client.cacheOptions.cacheEpisodes) this.client.cache.episodes.push(data);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

};

export default Episode;