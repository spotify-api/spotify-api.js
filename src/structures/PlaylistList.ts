import type { Client } from "../Client";
import {Playlist} from "./Playlist";

/**
 * Spotify api's playlist object.
 */
export class PlaylistList {
    /**
     * A link to the Web API endpoint returning the full result of the request.
     */
    public href: string;

    /**
     * URL to the next page of items. ( null if none).
     */
    public next?: string;

    /**
     * URL to the previous page of items. ( null if none).
     */
    public previous?: string;

    /**
     *  A list of Playlist.
     */
    public items: Playlist[];

    /**
     * The maximum number of items in the response (as set in the query or by default).
     */
    public limit: number;

    /**
     * The offset of the items returned (as set in the query or by default).
     */
    public offset: number;

    /**
     * The total number of items available to return.
     */
    public total: number;

    /**
     * @param data The raw data received from the api.
     * @param client The spotify client.
     * @example const playlistList = new PlaylistList(fetchedData, client);
     */
    public constructor(data: any, client: Client) {
        this.href = data.href;
        this.next = data.next;
        this.previous = data.previous;
        this.items = data.items;
        this.limit = data.limit;
        this.offset = data.offset;
        this.total = data.total;
    }
}
