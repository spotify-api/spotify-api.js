import { Client } from './Client';
import { Artist as ArtistStruct } from './structures/Artist';
import { User as UserStruct } from './structures/User';

import { 
    PublicUser, 
    PrivateUser,  
    SimplifiedArtist, 
    SimplifiedTrack, 
    SimplifiedPlaylist,
    SimplifiedAlbum,
    SimplifiedEpisode,
    SimplifiedShow,
    Artist,
    Track, 
    Playlist,
    Album,
    Episode,
    Show
} from "api-types";

/** 
 * The cache handler for the module. 
 */
export const Cache = {
    users: new Map<string, PublicUser | PrivateUser>(),
    artists: new Map<string, SimplifiedArtist | Artist>(),
    tracks: new Map<string, SimplifiedTrack | Track>(),
    playlists: new Map<string, SimplifiedPlaylist | Playlist>(),
    albums: new Map<string, SimplifiedAlbum | Album>(),
    shows: new Map<string, SimplifiedShow | Show>(),
    episodes: new Map<string, SimplifiedEpisode | Episode>()
};

/**
 * Creates a cache structure from key, client and its raw data.
 * @hideconstructor
 */
export function createCacheStruct<T>(
    key: keyof typeof StructMap, 
    client: Client, 
    data: any
): T {
    if (client.cacheSettings[key]) Cache[key].set(data.id, data);
    // @ts-ignore
    return new StructMap[key](client, data);
}

/**
 * Creates am array of cache structure from key, client and its raw data.
 * @hideconstructor
 */
export function createCacheStructArray<T>(
    key: keyof typeof StructMap, 
    client: Client, 
    data: any[]
): T[] {
    // @ts-ignore
    return data.map(
        client.cacheSettings[key] ? x => {
            Cache[key].set(x.id, x);
            return new StructMap[key](client, x);
        } : x => new StructMap[key](client, x)
    );
}

/** The structures map by the keys as name and values as their corresponding structure. */
const StructMap = {
    users: UserStruct,
    artists: ArtistStruct
};