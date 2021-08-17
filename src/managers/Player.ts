import type { Device } from "api-types";
import type { Client } from "../Client";
import type { CamelCaseObjectKeys, CurrentPlayback } from "../Interface";
import { createCurrentPlayback, createDevice } from "../structures/Player";

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

}