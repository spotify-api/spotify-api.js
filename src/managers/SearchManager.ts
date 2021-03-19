import Client from '../Client';
import { Paging, SearchOptions, SpotifyTypes } from '../Types';

import Album from '../structures/Album';
import Artist from '../structures/Artist';
import Episode from '../structures/Episode';
import Playlist from '../structures/Playlist';
import Show from '../structures/Show';
import Track from '../structures/Track';
import { handleError } from '../Errors';

const defaultTypes = ['episode', 'playlist', 'show', 'track', 'album', 'artist'];

/**
 * The function type returned by client.search
 */
export type SearchMethod = (query: string, options: SearchOptions) => Promise<Search | null>;

/**
 * Object structure returned by client.search
 */
export interface Search{
    readonly shows: Paging<Show>;
    readonly tracks: Paging<Track>;
    readonly albums: Paging<Album>;
    readonly artists: Paging<Artist>;
    readonly episodes: Paging<Episode>;
    readonly playlists: Paging<Playlist>;
}

/**
 * Manager for spotify search api
 * 
 * @param client Your spotify client
 * @example const artists = await SearchManager(client)('Alan Walker');
 */
export default function SearchManager(client: Client): SearchMethod {

    async function search(query: string, options: SearchOptions = {
        type: defaultTypes.join(',') as SpotifyTypes,
        market: 'US'
    }): Promise<Search | null> {
        try{

            options.q = query;
            options.type = (Array.isArray(options.type) ? options.type.join(',') : (options.type || defaultTypes.join(','))) as SpotifyTypes;
            const data = await client.util.fetch('/search', { params: options });

            return {
                get shows(){ return makePaging(data.shows, Show, client) },
                get tracks(){ return makePaging(data.tracks, Track, client) },
                get albums(){ return makePaging(data.albums, Album, client) },
                get artists(){ return makePaging(data.artists, Artist, client) },
                get episodes(){ return makePaging(data.episodes, Episode, client) },
                get playlists(){ return makePaging(data.playlists, Playlist, client) }
            } 

        }catch(e){
            return handleError(e);
        }
    }

    return search;

}

function makePaging(
    data, 
    type, 
    client: Client
): Paging<any> {

    return data ? {
        limit: data.limit,
        offset: data.offset,
        total: data.total,
        items: data.items.map(x => new type(x, client))
    } : {
        limit: 0,
        offset: 0,
        total: 0,
        items: []
    }
    
}