"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const axios_1 = __importDefault(require("axios"));
class Auth {
    constructor(oauth) {
        if (!oauth)
            throw new Error_1.MissingParamError("missing oauth");
        this.token = oauth;
    }
    async get(options) {
        return new Promise(async (resolve, reject) => {
            if (!options.client_id)
                reject(new Error_1.MissingParamError("missing client id"));
            if (!options.client_secret)
                reject(new Error_1.MissingParamError("missing client secret"));
            const token = this.token;
            try {
                const { data } = await axios_1.default({
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
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
}
exports.default = Auth;
//# sourceMappingURL=Oauth.js.map