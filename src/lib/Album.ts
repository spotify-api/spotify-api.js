import { 
  MissingParamError,
  UnexpectedError
} from '../Error';

import Spotify from '../Spotify';

class Album extends Spotify{

  async search(
    q: string,
    options?: {
      limit?: string | null | number,
      advanced?: boolean
    }
  ): Promise<any> {
    if(!q) throw new MissingParamError('missing query!')
    if(!options) options = {};

    try{
      const res = await this.fetch({
        link: 'v1/search',
        params: {
          q: encodeURIComponent(q),
          market: 'US',
          limit: options.limit || 20,
          type: 'album'
        }
      });

      let items = res.albums.items;

      if(options.advanced){
        for(let i = 0; i < items.length; i++){
          let data = await this.getCodeImage(items[i].uri);
          items[i].codeImage = data.image;
          items[i].dominantColor = data.dominantColor;
        };
      };

      return items;
    }catch(e){
      throw new UnexpectedError(e)
    };
  };

  async get(id: string): Promise<any> {
    if(!id) throw new MissingParamError('missing id');

    try{
      return await this.fetch({
        link: `v1/albums/${id}`
      })
    }catch(e){
      throw new UnexpectedError(e)
    };
  };

  async getTracks(
    id: string,
    options?: {
      limit?: string | null | number,
      advanced?: boolean
    }
  ): Promise<any> {
    if(!id) throw new MissingParamError('missing id!')
    if(!options) options = {};

    try{
      const res = await this.fetch({
        link: `v1/albums/${id}/tracks`,
        params: {
          limit: options.limit || 20,
          market: 'US',
          offset: '0'
        }
      });

      let items = res.items;

      if(options.advanced){
        for(let i = 0; i < items.length; i++){
          let data = await this.getCodeImage(items[i].uri);
          items[i].codeImage = data.image;
          items[i].dominantColor = data.dominantColor;
        };
      };

      return items;
    }catch(e){
      throw new UnexpectedError(e)
    };
  };

};

export default Album;
