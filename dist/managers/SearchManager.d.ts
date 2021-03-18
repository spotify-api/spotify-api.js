import Client from '../Client';
import { SearchOptions } from '../Types';
import Album from '../structures/Album';
import Artist from '../structures/Artist';
import Episode from '../structures/Episode';
import Playlist from '../structures/Playlist';
import Show from '../structures/Show';
import Track from '../structures/Track';
/**
 * The function type returned by client.search
 */
export declare type SearchMethod = (query: string, options: SearchOptions) => Promise<Search | null>;
/**
 * Object structure returned by client.search
 */
export interface Search {
    readonly shows: Show[];
    readonly tracks: Track[];
    readonly albums: Album[];
    readonly artists: Artist[];
    readonly episodes: Episode[];
    readonly playlists: Playlist[];
}
/**
 * Manager for spotify search api
 *
 * @param client Your spotify client
 * @example const artists = await SearchManager(client)('Alan Walker');
 */
export default function SearchManager(client: Client): SearchMethod;
