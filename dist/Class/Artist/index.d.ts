declare class track {
    token: string;
    constructor(oauth: string);
    search(q: string, limit: null | number | string): Promise<any>;
    get(artid: string): Promise<any>;
    advanced(query: string): Promise<any>;
}
export default track;
