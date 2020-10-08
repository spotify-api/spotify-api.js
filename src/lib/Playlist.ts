import { MissingParamError, UnexpectedError } from "../Error";

import Spotify from "../Spotify";

class Playlist extends Spotify {
  async get(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!id) reject(new MissingParamError("missing id"));

      try {
        const res = await this.fetch({
          link: `v1/playlists/${id}`,
          params: {
            market: "US",
          },
        });
        res.codeImg = `https://scannables.scdn.co/uri/plain/jpeg/e8e6e6/black/1080/${res.uri}`;

        resolve(res);
      } catch (e) {
        reject(new UnexpectedError(e));
      }
    });
  }

  async getTracks(
    id: string,
    options?: {
      limit?: null | string | number;
      advanced?: boolean;
    }
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!id) reject(new MissingParamError("missing id"));
      if (!options) options = {};

      try {
        const res = await this.fetch({
          link: `v1/playlists/${id}/tracks`,
          params: {
            market: "US",
            limit: options.limit || 20,
          },
        });

        let items = res.items;

        if (options.advanced) {
          for (let i = 0; i < items.length; i++) {
            let data = await this.getCodeImage(items[i].uri);
            items[i].codeImage = data.image;
            items[i].dominantColor = data.dominantColor;
          }
        }

        resolve(items);
      } catch (e) {
        reject(new UnexpectedError(e));
      }
    });
  }
}

export default Playlist;
