declare class Spotify {
    token: string;
    constructor(oauth: string);
    hexRgb(hex: any): number[];
    getData(uri: any): Promise<any>;
}
export default Spotify;
