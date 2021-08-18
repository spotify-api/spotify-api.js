import type { Device, Cursor } from "api-types";
import type { Client } from "../Client";
import type { CamelCaseObjectKeys, CurrentPlayback, RecentlyPlayed } from "../Interface";
import { createCachedRecentlyPlayedStruct } from "../Cache";
import { createCurrentPlayback, createCurrentlyPlayingStruct, createDevice } from "../structures/Player";

/**
 * A manager to perform actions which belongs to the spotify player web api.
 */
export class Player {

    /**
     * The spotify client.
     */
    public readonly client!: Client;

    /**
     * The client which handles all the current user's player api endpoints.
     * All the methods in this class requires the user authorized token.
     * Few functions requires spotify premium.
     * 
     * @param client The spotify api client.
     * @example const player = new Player(client);
     */
    public constructor(client: Client) {
        Object.defineProperty(this, 'client', { value: client });
    }

    /**
     * Get the current playback of the current user's player.
     * 
     * @param additionalTypes A comma-separated list of item types that your client supports besides the default track type. Valid types are: track and episode.
     * @example const currentPlayback = await player.getCurrentPlayback();
     */
    public getCurrentPlayback(additionalTypes?: 'track' | 'episode'): Promise<CurrentPlayback | null> {
        return this.client.fetch(`/me/player`, { params: { additional_types: additionalTypes } })
            .then(x => x ? createCurrentPlayback(this.client, x) : null);
    }

    /**
     * Get the current playing content of the current user's player.
     * 
     * @param additionalTypes A comma-separated list of item types that your client supports besides the default track type. Valid types are: track and episode.
     * @example const currentPlayback = await player.getCurrentlyPlaying();
     */
    public getCurrentlyPlaying(additionalTypes?: 'track' | 'episode'): Promise<CurrentPlayback | null> {
        return this.client.fetch(`/me/player/currently-playing`, { params: { additional_types: additionalTypes } })
            .then(x => x ? createCurrentlyPlayingStruct(this.client, x) : null);
    }

    /**
     * Get the recently played data from the current user's player.
     * 
     * @param options The before, after and limit query paramaeters.
     * @example const recentlyPlayed = await player.getRecentlyPlayed();
     */
    public getRecentlyPlayed(options: Partial<Cursor> & { limit?: number } = {}): Promise<RecentlyPlayed> {
        return this.client.fetch(`/me/player/recently-played`, { params: options })
            .then(x => createCachedRecentlyPlayedStruct(this.client, x))
    }

    /**
     * Get the active devices which are logged into the current user's spotify account.
     * @example const devices = await player.getDevices();
     */
    public getDevices(): Promise<CamelCaseObjectKeys<Device>[]> {
        return this.client.fetch(`/me/player/devices`).then(x => x.devices.map(createDevice))
    }

    /**
     * Transfer the playback to an another device.
     * This method requires a spotify premium account.
     * 
     * @param deviceID The device id to be transferred.
     * @param play The playback state to set by default it is false.
     * @example await player.transferPlayback('deviceID');
     */
    public transferPlayback(deviceID: string, play = false): Promise<boolean> {
        return this.client.fetch(`/me/player`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: { device_ids: [deviceID], play }
        }).then(x => x != null);
    }

    /**
     * Play or resume the current user's playback.
     * This method requires a spotify premium account.
     * This methods uses the [/me/player/play] endpoint which does not has complete documentation.
     * 
     * **Options for the function:**
     * - `deviceID` The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * - `contextURI` Not documented.
     * - `uris` Not documented.
     * - `offset` Not documented.
     * - `position` To seek to a position while playing.
     * 
     * @param options The deviceID, contextURI, uris, offset and position parameter.
     * @example await player.play();
     */
    public play(
        options: {
            deviceID?: string,
            contextURI?: string,
            uris?: string[],
            offset?: number,
            position?: number
        } = {}
    ): Promise<boolean> {
        return this.client.fetch(`/me/player/play`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            params: { device_id: options.deviceID },
            body: {
                context_uri: options.contextURI,
                uris: options.uris,
                offset: options.offset,
                position_ms: options.position
            } as any
        }).then(x => x != null);
    }

    /**
     * Pause the current user's playback.
     * This method requires a spotify premium account.
     * 
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.pause();
     */
    async pause(deviceID?: string): Promise<boolean> {
        return this.client.fetch(`/me/player/pause`, {
            method: 'PUT',
            params: { device_id: deviceID }
        }).then(x => x != null);
    }

    /**
     * Skip to the next track in the current user's playback.
     * This method requires a spotify premium account.
     * 
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.skip();
     */
    async skip(deviceID?: string): Promise<boolean> {
        return this.client.fetch(`/me/player/next`, {
            method: 'POST',
            params: { device_id: deviceID }
        }).then(x => x != null);
    }

    /**
     * Skip to the previous track in the current user's playback.
     * This method requires a spotify premium account.
     * 
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.previous();
     */
    async previous(deviceID?: string): Promise<boolean> {
        return this.client.fetch(`/me/player/previous`, {
            method: 'POST',
            params: { device_id: deviceID }
        }).then(x => x != null);
    }

    /**
     * Seek to a paticular position in the current user's player.
     * This method requires a spotify premium account.
     * 
     * @param position The position in milliseconds to seek to. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.seek(10000);
     */
    async seek(position: number, deviceID?: string): Promise<boolean> {
        return this.client.fetch(`/me/player/seek`, {
            method: 'PUT',
            params: { 
                position_ms: position,
                device_id: deviceID 
            }
        }).then(x => x != null);
    }

    /**
     * Set the repeat mode for the user’s playback. 
     * This method requires a spotify premium account.
     * 
     * @param state State should be track, context or off. **track** will repeat the current track. **context** will repeat the current context. **off** will turn repeat off.
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.setRepeatState('off');
     */
    async setRepeatState(state: 'track' | 'context' | 'off', deviceID?: string): Promise<boolean> {
        return this.client.fetch(`/me/player/repeat`, {
            method: 'PUT',
            params: {
                device_id: deviceID,
                state
            }
        }).then(x => x != null);
    }

    /**
     * Toggle shuffle state for the current user's playback.
     * This method requires a spotify premium account.
     * 
     * @param state The shuffle state to set.
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.setShuffleState();
     */
    async setShuffleState(state = true, deviceID?: string): Promise<boolean> {
        return this.client.fetch(`/me/player/shuffle`, {
            method: 'PUT',
            params: {
                device_id: deviceID,
                state
            }
        }).then(x => x != null);
    }

    /**
     * Set volume for the current user's player.
     * This method requires a spotify premium account.
     * 
     * @param volume The volume to set. Must be a value from 0 to 100 inclusive.
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.setVolume(80);
     */
    async setVolume(volume: number, deviceID?: string): Promise<boolean> {
        return this.client.fetch(`/me/player/volume`, {
            method: 'PUT',
            params: {
                volume_percent: volume,
                device_id: deviceID
            }
        }).then(x => x != null);
    }

    /**
     * Add an item to the current user's queue.
     * This method requires a spotify premium account.
     * 
     * @param uri The uri of the track or the episode to add to the queue.
     * @param deviceID The id of the device this command is targeting. If not supplied, the user’s currently active device is the target.
     * @example await player.addItem('uri');
     */
    async addItem(uri: string, deviceID?: string): Promise<boolean> {
        return this.client.fetch(`/me/player/queue`, {
            method: 'POST',
            params: {
                device_id: deviceID,
                uri
            }
        }).then(x => x != null);
    }

}