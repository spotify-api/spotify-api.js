import type { Client } from './Client';
import type { Saved } from './Interface';
import { Artist } from './structures/Artist';
import { User } from './structures/User';
import { Track } from './structures/Track';
import { Album } from './structures/Album';
import { Playlist } from './structures/Playlist';
import { Episode } from './structures/Episode';
import { Show } from './structures/Show';

/** 
 * The cache handler for the module. 
 */
const Cache = {
    users: new Map<string, User>(),
    artists: new Map<string, Artist>(),
    tracks: new Map<string, Track>(),
    albums: new Map<string, Album>(),
    playlists: new Map<string, Playlist>(),
    episodes: new Map<string, Episode>(),
    shows: new Map<string, Show>()
};

/**
 * Creates a cache structure from key, client and its raw data.
 * @hideconstructor
 */
export function createCacheStruct<T>(
    key: keyof typeof Structures, 
    client: Client, 
    data: any
): T {
    if (client.cacheSettings[key]) Cache[key].set(data.id, data);
    // @ts-ignore
    return new Structures[key](data, client);
}

/**
 * Creates an array of cache structure of a saved object from key, client and its raw data.
 * @hideconstructor
 */
export function createCacheSavedStructArray<T>(
    key: keyof typeof Structures,
    client: Client,
    data: [],
    fromCache: boolean = false
): Saved<T>[] {
    let normalKey = key.slice(0, -1);
    // @ts-ignore
    return data.map(
        client.cacheSettings[key] && !fromCache ? (x: any) => {
            const mainData = x[normalKey];
            Cache[key].set(mainData.id, mainData);
            return { addedAt: x.added_at, item: new Structures[key](mainData, client) };
        } : (x: any) => ({ addedAt: x.added_at, item: new Structures[key](x[normalKey], client) })
    );
};

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
    playlists: Playlist,
    episodes: Episode,
    shows: Show
};

export { Cache }