declare class track {
    token: string;
    constructor(oauth: string);
    search(q: string, limit?: null | number | string, options?: any): Promise<any>;
    get(trackid: string): Promise<any>;
    audioFeatures(trackid: string): Promise<any>;
    analysis(trackid: string): Promise<any>;
}
export default track;
