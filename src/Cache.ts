import { Client } from './Client';
import { Artist } from './structures/Artist';
import { User } from './structures/User';
import { Track } from './structures/Track';
import { Album } from './structures/Album';
import { Playlist } from './structures/Playlist';

/** 
 * The cache handler for the module. 
 */
export const Cache = {
    users: new Map<string, User>(),
    artists: new Map<string, Artist>(),
    tracks: new Map<string, Track>(),
    albums: new Map<string, Album>(),
    playlists: new Map<string, Playlist>()
};

/**
 * Creates a cache structure from key, client and its raw data.
 * @hideconstructor
 */
export function createCacheStruct<T>(
    key: keyof typeof Structures, 
    client: Client, 
    data: any,
    fromCache = false
): T {
    if (client.cacheSettings[key] && !fromCache) Cache[key].set(data.id, data);
    // @ts-ignore
    return new StructMap[key](client, data);
}

/**
 * Creates am array of cache structure from key, client and its raw data.
 * @hideconstructor
 */
export function createCacheStructArray<T>(
    key: keyof typeof Structures, 
    client: Client, 
    data: any[],
    fromCache = false
): T[] {
    // @ts-ignore
    return data.map(
        client.cacheSettings[key] && !fromCache ? x => {
            Cache[key].set(x.id, x);
            return new Structures[key](x, client);
        } : x => new Structures[key](x, client)
    );
}

/** The structures map by the keys as name and values as their corresponding structure. */
const Structures = {
    users: User,
    artists: Artist,
    tracks: Track,
    albums: Album,
    playlists: Playlist
};