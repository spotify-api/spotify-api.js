// Export all the basics of the module.
export * from './Client';
export * from './Interface';
export * from './Error';
export { Cache } from './Cache';
export * as Util from './Util';

// Export all the managers of the module.
export * from './managers/Auth';
export * from './managers/User';
export * from './managers/Artist';
export * from './managers/Browse';
export * from './managers/Album';
export * from './managers/Episode';
export * from './managers/Playlist';
export * from './managers/Show';
export * from './managers/Track';
export * from './managers/UserClient';
export * from './managers/Player';

// Export all the structures of the module.
export * from './structures/Track';
export * from './structures/User';
export * from './structures/Artist';
export * from './structures/Album';
export * from './structures/Playlist';
export * from './structures/Episode';
export * from './structures/Show';
export * from './structures/Player';

// Reexporting Types from the raw typings modules
export type { 
    ExternalUrl, 
    RecommendationSeed, 
    RecommendationQuery,
    SpotifyType, 
    SearchType, 
    Device, 
    Cursor, 
    AlbumGroup, 
    Category,
    CreatePlaylistQuery, 
    Image, 
    AudioAnalysis, 
    AudioFeatures, 
    UserProductType, 
    ExplicitContentSettings, 
    Restriction, 
    AlbumType, 
    Copyright, 
    ExternalID, 
    CursorPaging, 
    PlayHistory, 
    ResumePoint, 
    Episode as APIEpisode, 
    SimplifiedEpisode as APISimplifiedEpisode, 
    Artist as APIArtist,
    SimplifiedArtist as APISimplifiedArtist, 
    Playlist as APIPlaylist, 
    SimplifiedPlaylist as APISimplifiedPlaylist,
    PlaylistTrack as APIPlaylistTrack, 
    Track as APITrack, 
    SimplifiedTrack as APISimplifiedTrack,
    Show as APIShow,
    SimplifiedShow as APISimplifiedShow,
    Album as APIAlbum, 
    SimplifiedAlbum as APISimplifiedAlbum, 
    PublicUser as APIPublicUser,
    PrivateUser as APIPrivateUser 
} from "spotify-types"