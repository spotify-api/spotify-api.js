import Client from './Client';
import AuthManager, { GetUserTokenOptions } from './managers/AuthManager';
import UserClient from './UserClient';
import Util from './Util';

export const version = '8.0.0';

export {
    default as Util,
    FetchOptions,
    resolveURI,
    URIData
} from './Util';

export { default as Client, ClientOptions } from './Client';
export { default as Collection } from './utils/Collection';

export { default as AuthManager, GetUserTokenOptions, AuthRefresh } from './managers/AuthManager';
export { default as BaseManager } from './managers/BaseManager';
export { default as UserManager } from './managers/UserManager';
export { default as PlaylistManager, ReorderOptions } from './managers/PlaylistManager';
export { default as EpisodeManager } from './managers/EpisodeManager';
export { default as ShowManager } from './managers/ShowManager';
export { default as BrowseManager, FeaturedPlaylists } from './managers/BrowseManager';
export { default as TrackManager } from './managers/TrackManager';
export { default as AlbumManager } from './managers/AlbumManager';
export { default as ArtistManager } from './managers/ArtistManager';

export { 
    default as PlayerManager,
    Device,
    DeviceType,
    Context,
    ContextType,
    CurrentPlayback,
    CurrentPlaybackType,
    CurrentlyPlaying,
    CurrentlyPlayingType,
    PlayHistory,
    PlayHistoryType,
    RecentlyPlayedType
} from './managers/PlayerManager';

export { default as SearchManager, Search, SearchMethod } from './managers/SearchManager';

export { default as User } from './structures/User';
export { default as Playlist, PlaylistTrack, PlaylistTrackType } from './structures/Playlist';
export { default as Episode } from './structures/Episode';
export { default as Show } from './structures/Show';
export { default as Track, LinkedTrack, LinkedTrackType } from './structures/Track';
export { default as Album } from './structures/Album';
export { default as Artist } from './structures/Artist';

export * from './Errors';
export * from './Types';
export * from './UserClient';

/**
 * Returns a userclient only object by token
 * Remember that this method cache user's private info before returning the user client
 * 
 * @param token A valid spotify current user authorized token or get user token options
 * @example const user = await Spotify.createUser('token');
 */
export async function createUser(token: string | GetUserTokenOptions): Promise<UserClient> {
    if(typeof token == 'object'){
        const user = new UserClient(
            (await (new AuthManager('NO TOKEN'))
            .getUserToken(token)).accessToken
        )

        return await user.info();
    }

    const user = new UserClient(token);
    return await user.info();
}

export { UserClient };
export default Client;