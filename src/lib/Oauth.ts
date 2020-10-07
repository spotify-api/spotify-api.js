import { 
  MissingParamError,
  UnexpectedError
} from '../Error';

import axios from "axios";

class Auth{

  token: string;

  constructor(oauth: string){
    if(!oauth) throw new MissingParamError('missing oauth')
    this.token = oauth
  }

  async get(id: string, secret: string): Promise<any> {
    if(!id) throw new MissingParamError('missing client id');
    if(!secret) throw new MissingParamError('missing client secret');

    try{
      const { data } = await axios({
        method: 'post',
          url: 'https://accounts.spotify.com/api/token',
        params: {
          grant_type: 'client_credentials',
          token: this.token,
          client_id: id,
          client_secret: secret
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      return data;
    }catch(e){
      throw new UnexpectedError(e);
    }
  }
}

export default Auth;
