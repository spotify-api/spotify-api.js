import type { Client } from "../Client";
import type { Album } from "../structures/Album";
import { createCacheStructArray } from "../Cache";

/**
 * A manager to perform actions which belongs to the spotify browse web api.
 */
export class BrowseManager {

    /**
     * A manager to perform actions which belongs to the spotify browse web api.
     * 
     * @param client The spotify api client.
     * @example const browse = new BrowseManager(client);
     */
    public constructor(public client: Client) {}

    /**
     * Get all the new album releases.
     * 
     * @param options The country, offset, limit query parameters options.
     * @example const albums = await browse.getNewReleases();
     */
    public async getNewReleases(
        options?: {
            country?: string,
            offset?: number,
            limit?: number
        }
    ): Promise<Album[]> {
        const fetchedData = await this.client.fetch('/browse/new-releases', { params: options });
        return fetchedData ? createCacheStructArray('albums', this.client, fetchedData.albums.items) : [];
    }

}