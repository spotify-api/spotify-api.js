import axios from "axios";
import spotify from "../../Interface";
import Spotify from "../../Spotify";
class User extends Spotify implements spotify {
  async get(userid: string) {
    if (!userid) throw new Error("(spotify-api.js)No User ID was provided");
    try {
      const { data: res } = await axios.get(
        `https://api.spotify.com/v1/users/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      res.codeImg = `https://scannables.scdn.co/uri/plain/jpeg/e8e6e6/black/1080/${res.uri}`;
      return res;
    } catch (e) {
      throw e.response.data;
    }
  }
}
export default User;
