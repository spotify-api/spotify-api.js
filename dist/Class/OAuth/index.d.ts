declare class auth {
    token: string;
    constructor(oauth: string);
    get(options: any, uri: string): Promise<any>;
}
export default auth;
