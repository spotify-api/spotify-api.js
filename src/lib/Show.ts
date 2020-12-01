/**
 * Show lib file
 */
import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import ShowStructure from "../structures/Show";
import SimplifiedEpisode from "../structures/SimplifiedEpisode"

/**
 * Class of all methods related to episode enpoints
 */
class Show extends Spotify{

    /**
     * **Example:**
     * ```js
     * const show = await spotify.shows.get('id'); // Returns show information by id
     * ```
     * 
     * @param id Id of the show
     */
    async get(id: string): Promise<ShowStructure> {

        return new Promise(async (resolve, reject) => {
            if(!id) reject(new MissingParamError('missing id'));
            
            try{
                resolve(new ShowStructure(await this.fetch({ link: `v1/shows/${id}` })));
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    /**
     * **Example:**
     * ```js
     * const show = await spotify.shows.getEpisodes('id'); // Returns all episodes of show by id
     * ```
     * 
     * @param id Id of the show
     * @param limit Limit of your results
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