import Artist from '../structures/Artist';
import { handleError, UnexpectedError } from '../Errors';
import BaseManager from './BaseManager';
import { GetMultipleOptions, Paging, PagingOptions, RawObject, SearchOptions } from '../Types';
import Album from '../structures/Album';
import Track from '../structures/Track';

/**
 * All artist api methods managed!
 */
export default class ArtistManager extends BaseManager{

    /**
     * Search artists
     * 
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.artists.search('some query');
     */
    async search(query: string, options?: Omit<SearchOptions, 'type'>): Promise<Paging<Artist>> {

        try{
            const data = (await this.fetch('/search', {
                params: {
                    ...options,
                    type: 'artist',
                    q: query
                }
            })).artists;
            
            const artists = data.items.map(x => new Artist(x, this.client));

            if(this.client.cacheOptions.cacheArtists){
                for(let i = 0; i < artists.length; i++) this.client.cache.artists.set(artists[i].id, artists[i]);
            }

            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: artists
            };
        }catch(e){
            return handleError(e) || {
                limit: 0,
                offset: 0,
                total: 0,
                items: []
            };
        }

    }

    /**
     * Get a spotify artist information by spotify id!
     * 
     * @param id Spotify artist id
     * @param force If true, will directly fetch else will search for cache first!
     * @example await client.artists.get('id');
     */
    async get(id: string, force: boolean = !this.client.cacheOptions.cacheArtists, market: string = 'US'): Promise<Artist | null> {

        try{
            if(!force){
                let exisiting = this.client.cache.artists.get(id);
                if(exisiting) return exisiting;
            }

            const artist = new Artist(await this.fetch(`/artists/${id}`, {
                params: { market }
            }), this.client);
            if(this.client.cacheOptions.cacheArtists) this.client.cache.artists.set(artist.id, artist);
            return artist;
        }catch(e){
            return handleError(e);
        }

    }

    /**
     * Get multiple artists at one fetch!
     * 
     * @param options Basic GetMultipleOptions
     * @example await client.artists.getMultiple({
     *     ids: ['123456789']
     * })
     */
    async getMultiple(options: GetMultipleOptions): Promise<Artist[]> {

        try{
            const def = { market: 'US', ids: [] as any };
            Object.assign(def, options);

            if(!def.ids.length  || def.ids.length > 20) throw new UnexpectedError("You must provide more than 1 and less than 20 ids to fetch multiple artists!");
            def.ids = def.ids.join(',');

            const artists = (await this.fetch('/artists', { 
                params: def
            })).artists.map(x => new Artist(x, this.client));

            if(this.client.cacheOptions.cacheArtists){
                for(let i = 0; i < artists.length; i++) this.client.cache.artists.set(artists[i].id, artists[i]);
            }

            return artists;
        }catch(e){
            return handleError(e) || [];
        }

    }

    /**
     * Returns the albums of the artist
     * 
     * @param id ID of the artist
     * @param options Basic PagingOptions
     * @example await client.artists.getAlbums('id');
     */
    async getAlbums(id: string, options: PagingOptions = { market: 'US' }): Promise<Paging<Album>> {

        try{
            const data = (await this.fetch(`/artists/${id}/albums`, { params: options as RawObject }));
            const albums = data.items.map(x => new Album(x, this.client));

            if(this.client.cacheOptions.cacheAlbums){
                for(let i = 0; i < albums.length; i++) this.client.cache.albums.set(albums[i].id, albums[i]);
            }

            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: albums
            };
        }catch(e){
            return handleError(e) || {
                limit: 0,
                offset: 0,
                total: 0,
                items: []
            };
        }

    }

    /**
     * Returns the top tracks of the artist
     * 
     * @param id ID of the artist
     * @param options Basic PagingOptions
     * @example await client.albums.getTopTracks('id');
     */
     async getTopTracks(id: string, options: PagingOptions = { market: 'US' }): Promise<Track[]> {

        try{
            const tracks = (await this.fetch(`/artists/${id}/top-tracks`, {
                params: options as RawObject
            })).tracks.map(x => new Track(x, this.client));

            if(this.client.cacheOptions.cacheTracks){
                for(let i = 0; i < tracks.length; i++) this.client.cache.tracks.set(tracks[i].id, tracks[i]);
            }

            return tracks;
        }catch(e){
            return handleError(e) || [];
        }

    }

    /**
     * Returns artists realted to the artist of whose id is provided!
     * 
     * @param id ID of the artist
     * @param options Basic PagingOptions
     * @example await client.albums.getRelatedArtists('id');
     */
    async getRelatedArtists(id: string, options: PagingOptions = { market: 'US' }): Promise<Artist[]> {

        try{
            const artists = (await this.fetch(`/artists/${id}/related-artists`, {
                params: options as RawObject
            })).artists.map(x => new Artist(x, this.client));

            if(this.client.cacheOptions.cacheArtists){
                for(let i = 0; i < artists.length; i++) this.client.cache.artists.set(artists[i].id, artists[i]);
            }

            return artists;
        }catch(e){
            return handleError(e) || [];
        }

    }

    /**
     * Follow one or many artists!
     * 
     * @param ids ID of the spotify artists
     * @example await client.artists.follow('id', 'id2');
     */
    async follow(...ids: string[]): Promise<boolean> {
        return await this.client.user.followArtists(...ids);
    }

    /**
     * Unfollow one or many artists!
     * 
     * @param ids ID of the spotify artists
     * @example await client.artists.unfollow('id', 'id2');
     */
    async unfollow(...ids: string[]): Promise<boolean> {
        return await this.client.user.unfollowArtists(...ids);
    }

    /**
     * Verify if the current user follows one or many artists
     * 
     * @param ids ID of the spotify artists
     * @example const [followsFirstArtist, followsSecondArtist] = await client.artists.follows('id1', 'id2');
     */
    async follows(...ids: string[]): Promise<boolean[]> {
        return await this.client.user.followsArtists(...ids);
    }

}

export type { Artist };