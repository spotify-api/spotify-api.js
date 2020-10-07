import { 
  MissingParamError,
  UnexpectedError
} from '../Error';

import Spotify from '../Spotify';

class Track extends Spotify{

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
          type: 'track',
          market: 'US',
          limit: options.limit || 20
        }
      });

      let items = res.tracks.items;

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
    if(!id) throw new MissingParamError('missing id')

    try{
      const data = await this.fetch({
        link: `v1/tracks/${id}`,
      })
      const codeImage = await this.getCodeImage(data.uri)
      data.codeImage = codeImage.image
      data.dominantColor = codeImage.dominantColor

      return data
    }catch(e){
      throw new UnexpectedError(e)
    }
  }

  async audioFeatures(id: string): Promise<any> {
    if(!id) throw new MissingParamError('missing id')

    try{
      const res = await this.fetch({
        link: `v1/audio-features/${id}`
      })
      return res
    }catch(e){
      throw new UnexpectedError(e)
    }
  }

  async audioAnalysis(id: string): Promise<any> {
    if(!id) throw new MissingParamError('missing id')

    try{
      const res = await this.fetch({
        link: `v1/audio-analysis/${id}`
      })
      return res
    }catch(e){
      throw new UnexpectedError(e)
    }
  }
}

export default Track
