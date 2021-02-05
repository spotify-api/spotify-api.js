/**
 * Show Manager file
 */
import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import Client from "../Client";
import Show from "../structures/Show";
import Episode from "../structures/Episode";

/**
 * Class of all Spotify Api Methods related to shows
 */
export default class ShowManager extends Spotify{

    client: Client;

    /**
     * Class of all Spotify Api Methods related to shows
     * 
     * @param client Your Spotify Client
     */
    constructor(client: Client){
        super(client.token);
        this.client = client;
    }

    /**
     * Search shows efficiently!
     * 
     * @param q Your query
     * @param options Options such as limit and params
     * @example const [show] = await spotify.shows.search("search", { limit: 1 }); // Returns the very first search
     */
    async search(q: string, options: { limit?: number; params?: any; } = { limit: 20 }): Promise<Show[]> {

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

            let items = data.episodes.items.map(x => new Show(x, this.client));
            if(this.client.cacheOptions.cacheShows) this.client.cache.shows.push(...items);
            return items;
        }catch(e) {
            throw new UnexpectedError(e);
        }

    };

    /**
     * Returns a Spotify Show Information by its Id!
     * 
     * @param id Id of the show
     * @param force If true will fetch instead of search cache
     * @example const show = await spotify.shows.get('id'); // Returns show information by id
     */
    async get(id: string, force: boolean = false): Promise<Show> {

        if(!id) throw new MissingParamError('missing id');
        if(!force){
            let existing = this.client.cache.shows.get(id);
            if(existing) return existing;
        }
            
        try{
            const data = new Show(await this.fetch({ link: `v1/shows/${id}` }), this.client);
            if(this.client.cacheOptions.cacheShows) this.client.cache.shows.push(data);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

    /**
     * Returns the episodes of the show by the episode id!
     * 
     * @param id Id of the show
     * @param options Options such as limit and params
     * @example const episode = await spotify.shows.getEpisodes('id'); // Returns all episodes of show by id
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
    async delete(...ids: string[]): Promise<void> {
        await this.client.user.deleteShow(...ids);
    }

    /**
     * This method uses client.user.addShow
     * This method adds the show to your saved list
     * 
     * @param ids Id of the show or shows
     */
    async add(...ids: string[]): Promise<void> {
        await this.client.user.addShow(...ids);
    }

};