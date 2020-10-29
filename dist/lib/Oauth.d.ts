/**
 * Auth lib file
 */
/**
 * Interface of Auth.refresh return object
 */
export interface refresh {
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
    constructor(oauth: string);
    /**
     * @param options Your client id and client secret in object form
     *
     * **Example:**
     * ```js
     * client.oauth.get({
     *     client_id: 'your-client-id',
     *     client_secret: 'your-client-secret'
     * }).then(console.log) // Will return you the token!
     * ```
     */
    get(options: {
        client_id: string;
        client_secret: string;
    }): Promise<String>;
    /**
     * @param options Your client id, client secret and refresh token
     * @param token Your token
     *
     * Refreshes an Authorization token
     */
    refresh(options: {
        client_id: string;
        client_secret: string;
        redirect_uri: string;
    }, token: string): Promise<refresh>;
    /**
     * @param options Your client id, client secret and redirect uri in object form
     *
     * Builds an Authorization string.
     */
    build(options: {
        client_id: string;
        client_secret: string;
        redirect_uri: string;
    }): string;
}
export default Auth;
