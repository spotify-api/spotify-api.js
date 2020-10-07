import { 
  MissingParamError,
  UnexpectedError
} from '../Error';

import Spotify from '../Spotify';

class User extends Spotify{

  async get(id: string): Promise<any> {
    try{
      if(!id) throw new MissingParamError('missing id to fetch user');

      const res = await this.fetch({
        link: `v1/users/${id}`
      });

      res.codeImage = `https://scannables.scdn.co/uri/plain/jpeg/e8e6e6/black/1080/${res.uri}`;

      return res;
    }catch(e){
      throw new UnexpectedError(e);
    }
  }
};

export default User
