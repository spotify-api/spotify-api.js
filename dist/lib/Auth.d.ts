/**
 * Auth lib file
 */
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
declare class Auth {
    token: string;
    /**
     * @param oauth Your token
     * Auth class
     */
    constructor(oauth?: string);
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
    get(options: {
        client_id: string;
        client_secret: string;
    }): Promise<String>;
    /**
     * Refreshes an Authorization token
     *
     * @param options Your client id, client secret, redirect uri and refresh token aka code
     */
    refresh(options: {
        client_id: string;
        client_secret: string;
        redirect_uri: string;
        code: string;
    }): Promise<AuthRefresh>;
    /**
     * Builds an Authorization url string.
     *
     * @param options Your client id, redirect uri and scopes in object form
     */
    build(options: {
        client_id: string;
        redirect_uri: string;
        scopes?: string;
    }): string;
}
export default Auth;
