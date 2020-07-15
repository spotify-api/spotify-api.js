import axios from "axios";
import Spotify from "../../Spotify";
import spotify from "../../Interface";
class artist extends Spotify implements spotify {
  async search(q: string, limit?: null | number | string, options?: any) {
    if (!q) throw new Error("(Spotify-api.js)No search Query was provided");
    if (!limit) limit = 1;
    try {
      const { data: res } = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          q
        )}&type=artist&market=US&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      if (!res["artists"].items.length) return "No results found";
      if (options) {
        if (!options.advanced)
          Promise.reject("(spotify-api.js)Invalid options were provided");
        let i = 0;
        while (i < res.artists.items.length) {
          const data = await this.getData(
            res.artists.items[i].uri
          );
          res.artists.items[i].hex = data.dominantColor;
          let match = this.hexRgb(data.dominantColor);
          let c = "white";
          if (match[0] > 150) c = "black";
          res.artists.items[
            i
          ].codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(
            1
          )}/${c}/1080/${res.artists.items[i].uri}`;
          i++;
        }
        return res.artists.items;
      }
      return res["artists"].items;
    } catch (e) {
      throw e.response.data;
    }
  }
  async get(artid: string, option?: any) {
    if (!artid) throw new Error("No Artist ID was provided");
    try {
      const { data: res } = await axios.get(
        `https://api.spotify.com/v1/artists/${artid}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      if (option) {
        if (!option.advanced)
          Promise.reject("(spotify-api.js)Invalid options were provided");
        let i = 0;
        const data = await this.getData(res.uri);
        res.hex = data.dominantColor;
        let match = this.hexRgb(data.dominantColor);
        let c = "white";
        if (match[0] > 150) c = "black";
        res.codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(
          1
        )}/${c}/1080/${res.uri}`;
        return res;
      }
      if (!option) return res;
    } catch (e) {
      throw e.response.data;
    }
  }

  async albums(artistid: string, limit?: null | string | number, option?: any) {
    if (!artistid) throw new Error("(spotify-api.js)No Artist ID was provided");
    if (!limit) limit = 1;
    try {
      const { data: res } = await axios.get(
        `https://api.spotify.com/v1/artists/${artistid}/albums?include_groups=single&market=US&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      if (option) {
        if (!option.advanced)
          Promise.reject("(spotify-api.js)Invalid options were provided");
        let i = 0;
        while (i < res.items.length) {
          const data = await this.getData(
            res.items[i].uri
          );
          res.items[i].hex = data.dominantColor;
          let match = this.hexRgb(data.dominantColor);
          let c = "white";
          if (match[0] > 150) c = "black";
          res.items[
            i
          ].codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(
            1
          )}/${c}/1080/${res.items[i].uri}`;
          i++;
        }
        return res.items;
      }
      if (!option) return res.items;
    } catch (e) {
      throw e.response.data;
    }
  }
  async top(id: string, option?: any) {
    if (!id) throw new Error("(spotify-api.js)No Artist ID was provided");
    try {
      const { data: res } = await axios.get(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      if (option) {
        if (!option.advanced) return res;
        let i = 0;
        while (i < res.tracks.length) {
          const data = await this.getData(
            res.tracks[i].uri
          );
          res.tracks[i].hex = data.dominantColor;
          let match = this.hexRgb(data.dominantColor);
          let c = "white";
          if (match[0] > 150) c = "black";
          res.tracks[
            i
          ].codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(
            1
          )}/${c}/1080/${res.tracks[i].uri}`;
          i++;
        }
        return res;
      }
      if (!option) return res;
    } catch (e) {
      throw e.response.data;
    }
  }
  async related(id: string, options?: any) {
    if (!id) throw new Error("(spotify-api.js)No Artist ID was provided");
    try {
      const { data: res } = await axios.get(
        `https://api.spotify.com/v1/artists/${id}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      if (options) {
        if (!options.advanced) return res.artists;
        let i = 0;
        while (i < res.artists.length) {
          const data = await this.getData(
            res.artists[i].uri
          )
          res.artists[i].hex = data.dominantColor;
          let match = this.hexRgb(data.dominantColor);
          let c = "white";
          if (match[0] > 150) c = "black";
          res.artists[
            i
          ].codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(
            1
          )}/${c}/1080/${res.artists[i].uri}`;
          i++;
        }
        return res.artists;
      }
      if (!options) return res.artists;
    } catch (e) {
      throw e.reponse.data;
    }
  }
}
export default artist;
