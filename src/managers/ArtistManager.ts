import Artist from '../structures/Artist';
import { handleError } from '../Errors';
import BaseManager from './BaseManager';
import { PagingOptions, RawObject } from '../Types';
import Album from '../structures/Album';
import Track from '../structures/Track';

/**
 * All artist api methods managed!
 */
export default class ArtistManager extends BaseManager{

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
     * Returns the albums of the artist
     * 
     * @param id ID of the artist
     * @param options Basic PagingOptions
     * @example await client.artists.getAlbums('id');
     */
    async getAlbums(id: string, options: PagingOptions = { market: 'US' }): Promise<Album[]> {

        try{
            const albums = (await this.fetch(`/artists/${id}/albums`, {
                params: options as RawObject
            })).items.map(x => new Album(x, this.client));

            if(this.client.cacheOptions.cacheAlbums){
                for(let i = 0; i < albums.length; i++) this.client.cache.albums.set(albums[i].id, albums[i]);
            }

            return albums;
        }catch(e){
            return handleError(e) || [];
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
                for(let i = 0; i < tracks.length; i++) this.client.cache.albums.set(tracks[i].id, tracks[i]);
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
                for(let i = 0; i < artists.length; i++) this.client.cache.albums.set(artists[i].id, artists[i]);
            }

            return artists;
        }catch(e){
            return handleError(e) || [];
        }

    }

}

export type { Artist };