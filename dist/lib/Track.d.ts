import Spotify from "../Spotify";
declare class Track extends Spotify {
    search(q: string, options?: {
        limit?: null | string | number;
        advanced?: boolean;
    }): Promise<any>;
    get(id: string): Promise<any>;
    audioFeatures(id: string): Promise<any>;
    audioAnalysis(id: string): Promise<any>;
}
export default Track;
