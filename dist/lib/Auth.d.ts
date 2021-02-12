/**
 * Auth lib file
 */
import { AuthRefresh } from "../structures/Interface";
/**
 * Class of all methods related to auth
 */
export default class AuthManager {
    token: string;
    /**
     * Class of all methods related to auth
     *
     * @param oauth Your token
     */
    constructor(oauth?: string);
    /**
     * The method used to get a new token by client id and client secret!
     *
     * @param options Your client id and client secret in object form
     * @example client.oauth.get({
     *     client_id: 'your-client-id',
     *     client_secret: 'your-client-secret'
     * }).then(console.log) // Will return you the token!
     */
    get(options: {
        clientId: string;
        clientSecret: string;
    }): Promise<string>;
    /**
     * Used to refresh an current user token or get a new one!
     *
     * @param options Your client id, client secret, redirect uri and refresh token aka code
     */
    refresh(options: {
        clientId: string;
        clientSecret: string;
        redirectUrl: string;
        code: string;
    }): Promise<AuthRefresh>;
}
