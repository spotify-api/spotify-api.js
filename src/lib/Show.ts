/**
 * Show lib file
 */
import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import ShowStructure from "../structures/Show";
import SimplifiedEpisode from "../structures/SimplifiedEpisode"
import SimplifiedShow from "../structures/SimplifiedShow";

/**
 * Class of all methods related to episode enpoints
 */
class Show extends Spotify{

    /**
     * **Example:**
     * ```js
     * const [show] = await spotify.shows.search("search", { limit: 1 }); // Returns the very first search
     * ```
     * 
     * @param q Your query
     * @param options Options such as limit, advanced and params
     */
    async search(
        q: string,
        options: {
            limit?: number;
            advanced?: boolean;
            params?: any;
        } = {
            limit: 20
        }
    ): Promise<SimplifiedShow[]> {

        return new Promise(async (resolve, reject) => {
            if (!q) throw new MissingParamError("missing query!");

            try {
                const res = await this.fetch({
                    link: "v1/search",
                    params: {
                        q: encodeURIComponent(q),
                        market: "US",
                        limit: options.limit,
                        type: "show",
                        ...options.params
                    },
                });

                let items = res.episodes.items.map(x => new SimplifiedEpisode(x));

                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    }
                }

                resolve(items);
            } catch (e) {
                reject(new UnexpectedError(e));
            }
        });

    };

    /**
     * **Example:**
     * ```js
     * const show = await spotify.shows.get('id'); // Returns show information by id
     * ```
     * 
     * @param id Id of the show
     * @param options Options such as advanced
     */
    async get(
        id: string,
        options: { advanced?: boolean; } = {}
    ): Promise<ShowStructure> {

        return new Promise(async (resolve, reject) => {
            if(!id) reject(new MissingParamError('missing id'));
            
            try{
                let res = new ShowStructure(await this.fetch({ link: `v1/shows/${id}` }));

                if(options.advanced) {
                    let data = await this.getCodeImage(res.uri);
                    res.codeImage = data.image;
                    res.dominantColor = data.dominantColor;
                };

                resolve(res);
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

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
    async getEpisodes(
        id: string,
        options: {
            limit?: number;
            advanced?: boolean;
            params?: any;
        } = {
            limit: 20
        }
    ): Promise<SimplifiedEpisode[]> {

        return new Promise(async (resolve, reject) => {
            if(!id) reject(new MissingParamError('missing id'));
            
            try{
                let res = await this.fetch({
                    link: `v1/shows/${id}/episodes`,
                    params: {
                        market: 'US',
                        limit: options.limit,
                        ...options.params
                    }
                });
                
                res = res.items.map(x => new SimplifiedEpisode(x));

                if (options.advanced) {
                    for (let i = 0; i < res.length; i++) {
                        let data = await this.getCodeImage(res[i].uri);
                        res[i].codeImage = data.image;
                        res[i].dominantColor = data.dominantColor;
                    };
                };

                resolve(res);
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

};

export default Show;