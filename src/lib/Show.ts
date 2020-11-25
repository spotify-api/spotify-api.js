/**
 * Show lib file
 */
import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";

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
    async get(id: string): Promise<any> {

        return new Promise(async (resolve, reject) => {
            if(!id) reject(new MissingParamError('missing id'));
            
            try{
                resolve(
                    await this.fetch({
                        link: `v1/shows/${id}`
                    })
                );
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
    async getEpisodes(id: string, limit?: number): Promise<any> {

        return new Promise(async (resolve, reject) => {
            if(!id) reject(new MissingParamError('missing id'));
            
            try{
                resolve(
                    await this.fetch({
                        link: `v1/shows/${id}/episodes`,
                        params: {
                            market: 'US',
                            limit: limit || 20
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

};

export default Show;