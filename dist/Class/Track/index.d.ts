declare class track {
    token: string;
    constructor(oauth: string);
    search(q: string, limit: null | number | string): Promise<any>;
    get(trackid: string): Promise<any>;
    advanced(query: string): Promise<any>;
    audioFeatures(trackid: string): Promise<any>;
    analysis(trackid: string): Promise<any>;
}
export default track;
