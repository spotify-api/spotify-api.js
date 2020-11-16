/**
 * Episode lib file
 */
import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";

/**
 * Class of all methods related to episode enpoints
 */
class Episode extends Spotify{

    /**
     * **Example:**
     * ```js
     * const episode = await spotify.episodes.get('id'); // Returns the episode information by id
     * ```
     * 
     * @param id Id of the episode
     */
    async get(id: string): Promise<any> {

        return new Promise(async (resolve, reject) => {
            if(!id) reject(new MissingParamError('missing id'));
            
            try{
                resolve(
                    await this.fetch({
                        link: `v1/episodes/${id}`
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

};

export default Episode;