import type { Client } from "../Client";
import type { CursorPaging, Device, PlayHistory } from "spotify-types";
import type { CamelCaseObjectKeys, CurrentPlayback, CurrentlyPlaying, RecentlyPlayed } from "../Interface";
import { createCacheStruct } from "../Cache";

/**
 * Creates a device structure.
 * 
 * @param data The raw device.
 * @example const devices = createDevice(device);
 */
export function createDevice(data: Device): CamelCaseObjectKeys<Device> {
    return {
        id: data.id,
        isActive: data.is_active,
        isPrivateSession: data.is_private_session,
        isRestricted: data.is_restricted,
        name: data.name,
        type: data.type
    }
}

/**
 * Create the current playback structure.
 * 
 * @param client The spotify client.
 * @param data The data from the spotify api.
 * @example const currentPlayback = createCurrentPlayback(client, fetchedData);
 */
export function createCurrentPlayback(client: Client, data: any): CurrentPlayback {
    return {
        shuffleState: data.shuffle_state,
        repeatState: data.repeat_state,
        device: createDevice(data.device),
        ...createCurrentlyPlaying(client, data)
    }
}

/**
 * Create the object structure containing the currently playing details.
 * 
 * @param client The spotify client.
 * @param data The data from the spotify api.
 * @example const currentlyPlaying = createCurrentlyPlaying(client, fetchedData);
 */
export function createCurrentlyPlaying(client: Client, data: any): CurrentlyPlaying {
    return {
        timestamp: data.timestamp,
        progress: data.progress_ms,
        isPlaying: data.is_playing,
        currentPlayingType: data.currently_playing_type,
        item: data.item ? createCacheStruct(`${data.item.type}s` as any, client, data.item) : null,
        context: {
            externalURL: data.context.external_urls,
            href: data.context.href,
            type: data.context.type,
            uri: data.context.uri
        }
    }
}

/**
 * Creates a recently played structure containg the playhistory details.
 * 
 * @param client The spotify api client.
 * @param data The raw data fetched from the spotify api.
 * @example const recentlyPlayed = createRecentlyPlayed(client, data);
 */
export function createRecentlyPlayed(client: Client, data: CursorPaging<PlayHistory>): RecentlyPlayed {
    return {
        items: data.items.map(x => ({ track: createCacheStruct('tracks', client, x.track), playedAt: x.played_at })),
        cursors: data.cursors
    };
}