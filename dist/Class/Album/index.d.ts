declare class Album {
    token: string;
    constructor(oauth: any);
    search(q: string, limit?: null | number | string, options?: any): Promise<any>;
    get(albumid: string): Promise<any>;
    tracks(albumid: string, limit: null | number | string): Promise<any>;
}
export default Album;
