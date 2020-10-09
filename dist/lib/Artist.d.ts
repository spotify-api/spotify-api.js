import Spotify from "../Spotify";
declare class Artist extends Spotify {
    search(q: string, options?: {
        limit?: null | string | number;
        advanced?: boolean;
    }): Promise<any>;
    get(id: string): Promise<any>;
    getAlbums(id: string, options?: {
        limit?: null | string | number;
        advanced?: boolean;
    }): Promise<any>;
    topTracks(id: string, options?: {
        limit?: null | string | number;
        advanced?: boolean;
    }): Promise<any>;
    relatedArtists(id: string, options?: {
        advanced?: boolean;
    }): Promise<any>;
}
export default Artist;
