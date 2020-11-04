import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";

class Show extends Spotify{

    async get(id: string): Promise<any> {

        return new Promise(async (reject, resolve) => {
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

    async getEpisodes(id: string, limit?: number): Promise<any> {

        return new Promise(async (reject, resolve) => {
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