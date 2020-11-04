import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";

class Episode extends Spotify{

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