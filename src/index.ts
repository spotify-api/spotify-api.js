import Client from './Client';

export const version = '8.0.0';

export {
    default as Util,
    FetchOptions,
    resolveURI,
    URIData
} from './Util';

export { default as Client, ClientOptions } from './Client';
export { default as UserClient } from './UserClient';
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

export default Client;