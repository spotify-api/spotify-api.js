declare class Spotify {
    token: string;
    constructor(oauth: string);
    hexRgb(hex: any): number[];
}
export default Spotify;
