/**
 * A manager to perform actions regarding the authorization to the web api.
 */
export declare class AuthManager {
    token: string;
    /**
     * A manager to perform actions regarding the authorization to the web api.
     *
     * @param token The spotify web api token.
     * @example const auth = new AuthManager("token");
     */
    constructor(token: string);
    /**
     * Returns an api token from your spotify application client id and client secret!
     *
     * @param clientID Your spotify app's client id
     * @param clientSecret Your spotify app's client secret
     * @example await auth.getApiToken('id', 'secert');
     */
    getApiToken(clientID: string, clientSecret: string): Promise<string>;
}
