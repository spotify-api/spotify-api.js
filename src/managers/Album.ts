import type { Client } from "../Client";

/**
 * A manager to perform actions which belongs to the spotify album web api.
 */
export class AlbumManager {

    /**
     * A manager to perform actions which belongs to the spotify album web api.
     * 
     * @param client The spotify api client.
     * @example const albums = new AlbumManager(client);
     */
    public constructor(public client: Client) {}

}