declare class Auth {
    token: string;
    constructor(oauth: string);
    get(options: {
        client_id: string;
        client_secret: string;
    }): Promise<any>;
}
export default Auth;
