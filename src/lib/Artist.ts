import { 
  MissingParamError,
  UnexpectedError
} from '../Error';

import Spotify from '../Spotify';

class Artist extends Spotify{

  async search(
    q: string,
    options?: {
      limit?: null | string | number,
      advanced?: boolean
    }
  ): Promise<any> {
    if(!q) throw new MissingParamError('missing query');
    if(!options) options = {}

    try{
      const res = await this.fetch({
        link: `v1/search`,
        params: {
          q: encodeURIComponent(q),
          type: 'artist',
          market: 'US',
          limit: options.limit || 20
        }
      });

      let items = res.artists.items;

      if(options.advanced){
        for(let i = 0; i < items.length; i++){
          let data = await this.getCodeImage(items[i].uri)
          items[i].codeImage = data.image
          items[i].dominantColor = data.dominantColor
        }
      }

      return items
    }catch(e){
      throw new UnexpectedError(e);
    }
  };

  async get(id: string): Promise<any> {
    if(!id) throw new MissingParamError('missing id');

    try{
      const data = await this.fetch({
        link: `v1/artists/${id}`,
      });

      const codeImage = await this.getCodeImage(data.uri);
      data.codeImage = codeImage.image;
      data.dominantColor = codeImage.dominantColor;

      return data;
    }catch(e){
      throw new UnexpectedError(e);
    }
  };

  async getAlbums(
    id: string,
    options?: {
      limit?: null | string | number,
      advanced?: boolean
    }
  ): Promise<any> {
    if(!id) throw new MissingParamError('missing id');
    if(!options) options = {}

    try{
      const res = await this.fetch({
        link: `v1/artists/${id}/albums`,
        params: {
          limit: options.limit || 20,
          market: 'US',
          include_groups: 'single'
        }
      });

      let items = res.items;

      if(options.advanced){
        for(let i = 0; i < items.length; i++){
          let data = await this.getCodeImage(items[i].uri)
          items[i].codeImage = data.image
          items[i].dominantColor = data.dominantColor
        }
      }

      return items
    }catch(e){
      throw new UnexpectedError(e);
    }
  };

  async topTracks(
    id: string,
    options?: {
      limit?: null | string | number,
      advanced?: boolean
    }
  ): Promise<any> {
    if(!id) throw new MissingParamError('missing id');
    if(!options) options = {}

    try{
      const res = await this.fetch({
        link: `v1/artists/${id}/top-tracks`,
        params: {
          country: 'US'
        }
      });

      let items = res.tracks;

      if(options.advanced){
        for(let i = 0; i < items.length; i++){
          let data = await this.getCodeImage(items[i].uri)
          items[i].codeImage = data.image
          items[i].dominantColor = data.dominantColor
        }
      }

      return items
    }catch(e){
      throw new UnexpectedError(e);
    }
  };

  async relatedArtists(
    id: string,
    options?: {
      advanced?: boolean
    }
  ): Promise<any> {
    if(!id) throw new MissingParamError('missing id');
    if(!options) options = {}

    try{
      const res = await this.fetch({
        link: `v1/artists/${id}/related-artists`,
        params: {
          country: 'US'
        }
      });

      let items = res.artists;

      if(options.advanced){
        for(let i = 0; i < items.length; i++){
          let data = await this.getCodeImage(items[i].uri)
          items[i].codeImage = data.image
          items[i].dominantColor = data.dominantColor
        }
      }

      return items
    }catch(e){
      throw new UnexpectedError(e);
    }
  };

};

export default Artist;
