import type { Client } from "./Client";
import type { Saved } from "./Interface";
import { Artist } from "./structures/Artist";
import { User } from "./structures/User";
import { Track } from "./structures/Track";
import { Album } from "./structures/Album";
import { Playlist } from "./structures/Playlist";
import { Episode } from "./structures/Episode";
import { Show } from "./structures/Show";

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
	shows: new Map<string, Show>(),
};

/**
 * Creates a cache structure from key, client and its raw data.
 * @hideconstructor
 */
export function createCacheStruct<T>(key: keyof typeof Structures, client: Client, data: any): T {
	const structure = new Structures[key](data, client) as any;
	if (client.cacheSettings[key]) Cache[key].set(data.id, structure);
	return structure;
}

/**
 * Creates a structure which will be cached even if the option is set to false from key, client and its raw data.
 * @hideconstructor
 */
export function createForcedCacheStruct<T>(key: keyof typeof Structures, client: Client, data: any): T {
	const structure = new Structures[key](data, client) as any;
	Cache[key].set(data.id, structure);
	return structure;
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
	const normalKey = key.slice(0, -1);
	return data.map(
		client.cacheSettings[key] && !fromCache
			? (x: any) => {
					const item = new Structures[key](x[normalKey], client) as any;
					Cache[key].set(item.id, item);
					return { addedAt: x.added_at, item };
				}
			: (x: any) => ({ addedAt: x.added_at, item: new Structures[key](x[normalKey], client) })
	);
}

/**
 * Creates an array of cache structure from key, client and its raw data.
 * @hideconstructor
 */
export function createCacheStructArray<T>(
	key: keyof typeof Structures,
	client: Client,
	data: any[],
	fromCache = false
): T[] {
	return data.map(
		client.cacheSettings[key] && !fromCache
			? x => {
					const structure = new Structures[key](x, client) as any;
					Cache[key].set(x.id, structure);
					return structure;
				}
			: x => new Structures[key](x, client)
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
	shows: Show,
};

export { Cache };
