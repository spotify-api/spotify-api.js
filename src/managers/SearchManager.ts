import Client from '../Client';
import { SearchOptions, SpotifyTypes } from '../Types';

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
export default function SearchManager(client: Client): SearchMethod {

    async function search(query: string, options: SearchOptions = {
        type: defaultTypes.join(',') as SpotifyTypes
    }): Promise<Search | null> {
        try{

            options.q = query;
            options.type = (Array.isArray(options.type) ? options.type.join(',') : (options.type || defaultTypes.join(','))) as SpotifyTypes;
            const data = await client.util.fetch('/search', { params: options });

            return {
                get shows(){ return data.shows ? data.shows.items.map(x => new Show(x, client)) : [] },
                get tracks(){ return data.tracks ? data.tracks.items.map(x => new Track(x, client)) : [] },
                get albums(){ return data.albums ? data.albums.items.map(x => new Album(x, client)) : [] },
                get artists(){ return data.artists ? data.artists.items.map(x => new Artist(x, client)) : [] },
                get episodes(){ return data.episodes ? data.episodes.items.map(x => new Episode(x, client)) : [] },
                get playlists(){ return data.playlists ? data.playlists.items.map(x => new Playlist(x, client)) : [] }
            } 

        }catch(e){
            return handleError(e);
        }
    }

    return search;

}