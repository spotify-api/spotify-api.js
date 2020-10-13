interface refresh {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}
declare class Auth {
    token: string;
    constructor(oauth: string);
    get(options: {
        client_id: string;
        client_secret: string;
    }): Promise<String>;
    /**
     *
     * @param options
     * @param token
     * Refreshes an Authorization token
     */
    refresh(options: {
        client_id: string;
        client_secret: string;
        redirect_uri: string;
    }, token: string): Promise<refresh>;
    /**
     *
     * @param options
     * Builds an Authorization string.
     */
    build(options: {
        client_id: string;
        client_secret: string;
        redirect_uri: string;
    }): String;
}
export default Auth;
