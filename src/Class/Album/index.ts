import axios from "axios";

import spotify from "../../Interface";
import Spotify from "../../Spotify";
class Album extends Spotify implements spotify {
  async search(q: string, limit?: null | number | string, options?: any) {
    if (!q) throw new Error("(spotify-api.js)No query was Provided");
    if (!limit) limit = 1;
    try {
      const { data: res } = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          q
        )}&type=album&market=US&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      if (!res["albums"].items.length) return "No results found";
      if (options) {
        if (!options.advanced)
          Promise.reject("(spotify-api.js)Invalid options were provided");
        let i = 0;
        while (i < res.albums.items.length) {
          const data = await this.getData(
            res.albums.items[i].uri
          );
          res.albums.items[i].hex = data.dominantColor;
          let match = this.hexRgb(data.dominantColor);
          let c = "white";
          if (match[0] > 150) c = "black";
          res.albums.items[
            i
          ].codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(
            1
          )}/${c}/1080/${res.albums.items[i].uri}`;
          i++;
        }
        return res.albums.items;
      }
      if (!options) return res.albums.items;
    } catch (e) {
      throw e.response.data;
    }
  }
  async get(albumid: string) {
    if (!albumid) throw new Error("(spotify-api.js)No Album ID was Provided");
    try {
      const { data: res } = await axios.get(
        `https://api.spotify.com/v1/albums/${albumid}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return res;
    } catch (e) {
      Promise.reject("(spotify-api.js)Invalid ID or Token was given");
    }
  }
  async tracks(albumid: string, limit: null | number | string) {
    if (!albumid) throw new Error("(spotify-api.js)No Album ID was Provided");
    if (!limit) limit = 1;
    try {
      const { data: res } = await axios.get(
        `https://api.spotify.com/v1/albums/${albumid}/tracks?offset=0&limit=${limit}&market=US`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      let data = await this.getData(res.items[0].uri);
      let c = "white";
      res.items[0].hex = data.dominantColor;
      let match = this.hexRgb(data.dominantColor);
      if (match[0] > 150) c = "black";
      res.items[0].codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(
        1
      )}/${c}/1080/spotify:track:${res.items[0].id}`;
      return res.items;
    } catch (e) {
      throw e.response.data;
    }
  }
}
export default Album;
