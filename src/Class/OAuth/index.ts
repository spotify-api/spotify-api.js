import axios from "axios";
class auth {
  token: string;
  constructor(oauth: string) {
    this.token = oauth;
  }
  async get(options: any, uri: string) {
    let token: string = this.token;
    if (!options)
      throw new Error("(Spotify-api.js) No Authorization option was provided");
    
    if (!options.client_id)
      throw new Error("(Spotify-api.js) No Client ID was provided");

    if (!options.client_secret)
      throw new Error("(Spotify.js) No Client Secret was provided");
    let base = Buffer.from(
      `${options.client_id}:${options.client_secret}`
    ).toString("base64");
    const { data: res } = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      params: {
        grant_type: "client_credentials",
        token,
        client_secret: options.client_secret,
        client_id: options.client_id,
        redirect_uri: "https://www.discord.com",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.access_token;
  }
}
export default auth;
