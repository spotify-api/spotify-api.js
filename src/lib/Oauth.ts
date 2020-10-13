import { MissingParamError, UnexpectedError } from "../Error";
interface refresh {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}
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
  }): Promise<String> {
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

  /**
   *
   * @param options
   * @param token
   * Refreshes an Authorization token
   */
  async refresh(
    options: {
      client_id: string;
      client_secret: string;
      redirect_uri: string;
    },
    token: string
  ): Promise<refresh> {
    return new Promise(async (resolve, reject) => {
      if (!options.client_id)
        reject(new MissingParamError("missing client id"));
      if (!options.client_secret)
        reject(new MissingParamError("missing client secret"));
      if (!options.redirect_uri)
        reject(new MissingParamError("missing redirect uri"));
      if (!token) reject(new MissingParamError("missing token"));

      try {
        const { data } = await axios({
          method: "post",
          url: "https://accounts.spotify.com/api/token",
          params: {
            grant_type: "authorization_code",
            code: token,
            redirect_uri: options.redirect_uri,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(
                options.client_id + ":" + options.client_secret
              ).toString("base64"),
          },
        });
        resolve(data);
      } catch (e) {
        reject(new UnexpectedError(e));
      }
    });
  }

  /**
   *
   * @param options
   * Builds an Authorization string.
   */
  build(options: {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
  }): String {
    if (!options.client_id) throw new MissingParamError("missing client id");
    if (!options.client_secret)
      throw new MissingParamError("missing client secret");
    if (!options.redirect_uri)
      throw new MissingParamError("missing redirect uri");

    return (
      "https://accounts.spotify.com/en/authorize?" +
      "client_id=" +
      options.client_id +
      "&" +
      "redirect_uri=" +
      options.redirect_uri +
      "&" +
      "response_type=code"
    );
  }
}

export default Auth;
