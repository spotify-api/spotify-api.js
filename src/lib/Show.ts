/**
 * Show lib file
 */
import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import Client from "../Client";
import ShowStructure from "../structures/Show";
import Episode from "../structures/Episode";

/**
 * Class of all methods related to episode enpoints
 */
class Show extends Spotify{

    client: Client;

    constructor(token: string, client: Client){
        super(token);
        this.client = client;
    }

    /**
     * **Example:**
     * ```js
     * const [show] = await spotify.shows.search("search", { limit: 1 }); // Returns the very first search
     * ```
     * 
     * @param q Your query
     * @param options Options such as limit, advanced and params
     */
    async search(q: string, options: { limit?: number; params?: any; } = { limit: 20 }): Promise<ShowStructure[]> {

        if(!q) throw new MissingParamError("missing query!");

        try{
            const data = await this.fetch({
                link: "v1/search",
                params: {
                    q,
                    market: "US",
                    limit: options.limit,
                    type: "show",
                    ...options.params
                },
            });

            let items = data.episodes.items.map(x => new ShowStructure(x, this.client));
            if(this.client.cacheOptions.cacheShows) this.client.cache.shows.push(...items);
            return items;
        }catch(e) {
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * const show = await spotify.shows.get('id'); // Returns show information by id
     * ```
     * 
     * @param id Id of the show
     * @param force If true will fetch instead of search cache
     */
    async get(id: string, force: boolean = false): Promise<ShowStructure> {

        if(!id) throw new MissingParamError('missing id');
        if(!force){
            let existing = this.client.cache.shows.get(id);
            if(existing) return existing;
        }
            
        try{
            const data = new ShowStructure(await this.fetch({ link: `v1/shows/${id}` }), this.client);
            if(this.client.cacheOptions.cacheShows) this.client.cache.shows.push(data);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

    /**
     * **Example:**
     * ```js
     * const episode = await spotify.shows.getEpisodes('id'); // Returns all episodes of show by id
     * ```
     * 
     * @param id Id of the show
     * @param options Options such as limit, advanced and params
     */
    async getEpisodes(id: string, options: { limit?: number; params?: any; } = { limit: 20 }): Promise<Episode[]> {

        if(!id) throw new MissingParamError('missing id');
            
        try{
            const data = await this.fetch({
                link: `v1/shows/${id}/episodes`,
                params: {
                    market: 'US',
                    limit: options.limit,
                    ...options.params
                }
            });
                
            let items = data.items.map(x => new Episode(x, this.client));
            if(this.client.cacheOptions.cacheEpisodes) this.client.cache.episodes.push(...items);
            return items;
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

    /**
     * This method uses client.user.deleteShow
     * This method deletes the show from your saved list
     * 
     * @param ids Id of the show or shows
     */
    async delete(ids: string | string[]): Promise<void> {
        await this.client.user.deleteShow(ids);
    }

    /**
     * This method uses client.user.addShow
     * This method adds the show to your saved list
     * 
     * @param ids Id of the show or shows
     */
    async add(ids: string | string[]): Promise<void> {
        await this.client.user.addShow(ids);
    }

};

export default Show;