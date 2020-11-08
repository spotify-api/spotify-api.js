import Spotify from "./Spotify";
import UserPlayer from "./UserPlayer";
import Auth from './lib/Auth';
declare class UserClient extends Spotify {
    auth: Auth;
    player: UserPlayer;
    startedAt: number;
    constructor(token?: string);
    get uptime(): number;
    info(): Promise<any>;
    getTopArtists(): Promise<any>;
    getTopTracks(): Promise<any>;
    getPlaylists(limit?: number): Promise<any>;
    getAlbums(limit?: number): Promise<any>;
    getShows(limit?: number): Promise<any>;
    getTracks(limit?: number): Promise<any>;
    deleteAlbums(ids: string[]): Promise<any>;
    deleteTracks(ids: string[]): Promise<any>;
    deleteShows(ids: string[]): Promise<any>;
    addAlbums(ids: string[]): Promise<any>;
    addTracks(ids: string[]): Promise<any>;
    addShows(ids: string[]): Promise<any>;
    followsUser(ids: string[]): Promise<any>;
    followsArtist(ids: string[]): Promise<any>;
    followUser(ids: string[]): Promise<any>;
    followPlaylist(id: string): Promise<any>;
    followArtist(ids: string[]): Promise<any>;
    unfollowUser(ids: string[]): Promise<any>;
    unfollowPlaylist(id: string): Promise<any>;
    unfollowArtist(ids: string[]): Promise<any>;
    following(artists?: boolean): Promise<any>;
    login(options: {
        client_id: string;
        client_secret: string;
        redirect_uri: string;
        code: string;
    }): Promise<void>;
}
export default UserClient;
