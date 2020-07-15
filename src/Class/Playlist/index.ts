import axios from "axios";
import spotify from "../../Interface";
import Spotify from "../../Spotify";
class Playlist extends Spotify implements spotify {
  async get(id: string) {
    if (!id) throw new Error("No Playlist ID was prvided");
    try {
      const { data: res } = await axios.get(
        `https://api.spotify.com/v1/playlists/${id}?market=US`,
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
  async tracks(id: string, limit?: null | number | string, options?: any) {
    if (!id) throw new Error("No Playlist ID was prvided");
    if (!limit) limit = 1;
    try {
      const { data: res } = await axios.get(
        `https://api.spotify.com/v1/playlists/${id}/tracks?market=US&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      if (!res.items.length) return "No results found";
      if (!options) return res.items;
      if (options) {
        if (!options.advanced) return res.items;
        let i = 0;
        while (i < res.items.length) {
          const data = await this.getData(
            res.items[i].track.uri
          );
          res.items[i].hex = data.dominantColor;
          let match = this.hexRgb(data.dominantColor);
          let c = "white";
          if (match[0] > 150) c = "black";
          res.items[
            i
          ].codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(
            1
          )}/${c}/1080/${res.items[i].track.uri}`;
          i++;
        }
        return res.items;
      }
    } catch (e) {
      throw e.response.data;
    }
  }
}
export default Playlist;
