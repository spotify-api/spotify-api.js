/**
 * Episode lib file
 */
import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import EpisodeStructure from "../structures/Episode"
import SimplifiedEpisode from "../structures/SimplifiedEpisode";

/**
 * Class of all methods related to episode enpoints
 */
class Episode extends Spotify{

    /**
     * **Example:**
     * ```js
     * const [episode] = await spotify.episodes.search("search", { limit: 1 }); // Returns the very first search
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
    ): Promise<SimplifiedEpisode[]> {

        return new Promise(async (resolve, reject) => {
            if (!q) throw new MissingParamError("missing query!");

            try {
                const res = await this.fetch({
                    link: "v1/search",
                    params: {
                        q: encodeURIComponent(q),
                        market: "US",
                        limit: options.limit,
                        type: "episode",
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
     * const episode = await spotify.episodes.get('id'); // Returns the episode information by id
     * ```
     * 
     * @param id Id of the episode
     * @param options Advanced option
     */
    async get(
        id: string,
        options: { advanced?: boolean } = {}
    ): Promise<EpisodeStructure> {

        return new Promise(async (resolve, reject) => {
            if(!id) reject(new MissingParamError('missing id'));
            
            try{
                let res = new EpisodeStructure(await this.fetch({ link: `v1/episodes/${id}` }));

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

};

export default Episode;