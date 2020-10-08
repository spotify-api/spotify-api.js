import { MissingParamError, UnexpectedError } from "../Error";

import axios from "axios";

class Auth {
  token: string;

  constructor(oauth: string) {
    if (!oauth) throw new MissingParamError("missing oauth");
    this.token = oauth;
  }

  async get(options: {
    client_id: string;
    client_secret: string;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!options.client_id)
        reject(new MissingParamError("missing client id"));
      if (!options.client_secret)
        reject(new MissingParamError("missing client secret"));
      const token = this.token;
      try {
        const { data } = await axios({
          method: "post",
          url: "https://accounts.spotify.com/api/token",
          params: {
            grant_type: "client_credentials",
            token,
            client_id: options.client_id,
            client_secret: options.client_secret,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        resolve(data.access_token);
      } catch (e) {
        reject(new UnexpectedError(e));
      }
    });
  }
}

export default Auth;
