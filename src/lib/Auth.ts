/**
 * Auth lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import axios from "axios";

/**
 * Interface of Auth.refresh return object
 */
export interface AuthRefresh {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

/**
 * Class of all methods related to auth
 */
class Auth {

    token: string;

    /**
     * @param oauth Your token
     * Auth class
     */
    constructor(oauth?: string) {
        this.token = oauth || 'NO TOKEN';
    };

    /**
     * **Example:**
     * ```js
     * client.oauth.get({
     *     client_id: 'your-client-id',
     *     client_secret: 'your-client-secret'
     * }).then(console.log) // Will return you the token!
     * ```
     * 
     * @param options Your client id and client secret in object form
     */
    async get(options: {
        client_id: string;
        client_secret: string;
    }): Promise<String> {

        return new Promise(async (resolve, reject) => {
            if (!options.client_id) reject(new MissingParamError("missing client id"));
            if (!options.client_secret) reject(new MissingParamError("missing client secret"));

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

    };

    /**
     * Refreshes an Authorization token
     * 
     * @param options Your client id, client secret, redirect uri and refresh token aka code
     */
    async refresh(
        options: {
            client_id: string;
            client_secret: string;
            redirect_uri: string;
            code: string;
        }
    ): Promise<AuthRefresh> {

        return new Promise(async (resolve, reject) => {
            if (!options.client_id) reject(new MissingParamError("missing client id"));
            if (!options.client_secret) reject(new MissingParamError("missing client secret"));
            if (!options.redirect_uri) reject(new MissingParamError("missing redirect uri"));
            if (!options.code) reject(new MissingParamError("missing code"));

            try {
                const { data } = await axios({
                    method: "post",
                    url: "https://accounts.spotify.com/api/token",
                    params: {
                        grant_type: "authorization_code",
                        code: options.code,
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

    };

    /**
     * Builds an Authorization url string.
     * 
     * @param options Your client id, redirect uri and scopes in object form
     */
    build(options: {
        client_id: string;
        redirect_uri: string;
        scopes?: string;
    }): string {

        if (!options.client_id) throw new MissingParamError("missing client id");
        if (!options.redirect_uri) throw new MissingParamError("missing redirect uri");

        return (
            "https://accounts.spotify.com/en/authorize?" +
            "client_id=" +
            options.client_id +
            "&" +
            "redirect_uri=" +
            encodeURIComponent(options.redirect_uri) +
            "&" +
            "response_type=code" + 
            "&" + 
            (options.scopes ? `scope=${encodeURIComponent(options.scopes)}`: '')
        );
    };

};

export default Auth;
