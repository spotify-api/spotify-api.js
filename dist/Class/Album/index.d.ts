declare class Album {
    token: string;
    constructor(oauth: any);
    search(q: string, limit: null | number | string): Promise<any>;
}
export default Album;
