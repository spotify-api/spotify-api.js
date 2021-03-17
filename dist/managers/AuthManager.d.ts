/**
 * Options required for auth.getUserToken!
 */
export interface GetUserTokenOptions {
    clientID: string;
    clientSecret: string;
    redirectURL: string;
    code?: string;
    refreshToken?: string;
}
/**
 * Response sent by auth.getUserToken!
 */
export interface AuthRefresh {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    refreshToken: string;
    scope: string;
}
/**
 * Managing auth based api's of spotify!
 */
export default class AuthManager {
    token: string;
    /**
     * Managing auth based api's of spotify!
     *
     * @param token Your spotify oauth token
     * @example new Spotify.Auth();
     */
    constructor(token?: string);
    /**
     * Returns an api token from your client id and client secret!
     *
     * @param clientID Your spotify app's client id
     * @param clientSecret Your spotify app's client secret
     * @example await auth.getApiToken('id', 'secert');
     */
    getApiToken(clientID: string, clientSecret: string): Promise<string>;
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
    getUserToken(options: GetUserTokenOptions): Promise<AuthRefresh>;
}
