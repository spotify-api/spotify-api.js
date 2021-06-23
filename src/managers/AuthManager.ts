import axios from "axios";
import { UnexpectedError } from "../Errors";

/**
 * Options required for auth.getUserToken!
 */
export interface GetUserTokenOptions{
    clientID: string;
    clientSecret: string;
    redirectURL: string;
    code?: string;
    refreshToken?: string;
}

/**
 * Response sent by auth.getUserToken!
 */
export interface AuthRefresh{
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    refreshToken: string;
    scope: string;
}

/**
 * Managing auth based api's of spotify!
 */
export default class AuthManager{

    token: string;

    /**
     * Managing auth based api's of spotify!
     * 
     * @param token Your spotify oauth token
     * @example new Spotify.Auth();
     */
    constructor(token: string = 'NO TOKEN'){
        this.token = token;
    }

    /**
     * Returns an api token from your client id and client secret!
     * 
     * @param clientID Your spotify app's client id
     * @param clientSecret Your spotify app's client secret
     * @example await auth.getApiToken('id', 'secert');
     */
    async getApiToken(clientID: string, clientSecret: string): Promise<string> {
        try{
            const { data } = await axios({
                method: 'POST',
                url: 'https://accounts.spotify.com/api/token',
                params: {
                    grant_type: 'client_credentials',
                    token: this.token,
                    client_id: clientID,
                    client_secret: clientSecret
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })

            return data.access_token;
        }catch(e){
            throw new UnexpectedError(e);
        }
    }

    /**
     * Returns a token of the user token!
     * 
     * @param options Options required to get user token!
     * @example await auth.getUserToken({
     *    clientID: 'id',
     *    clientSecret: 'secret',
     *    code: 'code', // If attempting to get user token through authorization
     *    refreshToken: 'token', // If attempting to refresh token!
     *    redirectURL: 'url' // Needs to be the same what you have enetered while authorizing the token!
     * })
     */
    async getUserToken(options: GetUserTokenOptions): Promise<AuthRefresh> {
        try{
            let grant_type = (options.refreshToken && !options.code) 
                ? "refresh_token"
                : "authorization_code";

            const { data } = await axios({
                method: "post",
                url: "https://accounts.spotify.com/api/token",
                params: {
                    grant_type,
                    code: options.code,
                    refresh_token: options.refreshToken,
                    redirect_uri: options.redirectURL,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Basic " + Buffer.from(options.clientID + ":" + options.clientSecret).toString("base64"),
                },
            });

            return {
                accessToken: data.access_token,
                tokenType: data.token_type,
                scope: data.scope,
                refreshToken: data.refresh_token,
                expiresIn: data.expires_in
            };
        }catch(e){
            throw new UnexpectedError(e);
        }
    }

}