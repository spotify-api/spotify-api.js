import Spotify from "../Spotify";
declare class Album extends Spotify {
    search(q: string, options?: {
        limit?: string | null | number;
        advanced?: boolean;
    }): Promise<any>;
    get(id: string): Promise<any>;
    getTracks(id: string, options?: {
        limit?: string | null | number;
        advanced?: boolean;
    }): Promise<any>;
}
export default Album;
