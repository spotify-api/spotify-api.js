import { MissingParamError, UnexpectedError } from "../Error";

import Spotify from "../Spotify";

class User extends Spotify {
  async get(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!id) reject(new MissingParamError("missing id to fetch user"));

        const res = await this.fetch({
          link: `v1/users/${id}`,
        });

        res.codeImage = `https://scannables.scdn.co/uri/plain/jpeg/e8e6e6/black/1080/${res.uri}`;

        resolve(res);
      } catch (e) {
        reject(new UnexpectedError(e));
      }
    });
  }
}

export default User;
