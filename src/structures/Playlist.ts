import type { Client } from "../Client";
import type { User } from "./User";
import type { PlaylistTrack } from "../Interface";
import { Track } from "./Track";
import { Cache, createCacheStruct } from "../Cache";
import { hexToRgb } from "../Util";

import type { 
    Playlist as RawPlaylist,
    PlaylistTrack as RawPlaylistTrack,
    SimplifiedPlaylist,
    SpotifyType,
    Image,
    ExternalUrl
} from "api-types";


/**
 * Spotify api's playlist object.
 */
export class Playlist {

    /** 
     * True if the owner allows other users to modify the playlist. 
     */
    public collaborative: boolean;

    /** 
     * The playlist description. Only returned for modified, verified playlists, otherwise null.
     */
    public description: string | null;

    /**
     *  Known external URLs for this playlist. 
     */
    public externalURL: ExternalUrl;

    /** 
     * The Spotify ID for the playlist. 
     */
    public id: string;

    /** 
     * Images for the playlist. The array may be empty or contain up to three images. 
     */
    public images: Image[];

    /** 
     * The name of the playlist. 
     */
    public name: string;

    /** 
     * The user who owns the playlist. 
     */
    public owner: User;

    /** 
     * The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version 
     */
    public snapshotID: string;

    /**
     * The total number of tracks in the playlist.
     */
    public totalTracks: number;

    /** 
     * The Spotify URI for the playlist.
     */
    public uri: string;

    /** 
     * The object type: “playlist” 
     */
    public type: SpotifyType;

    /**
     * The total number of followers of the playlist.
     */
    public totalFollowers?: number;

    /** 
     * The playlist’s public/private status: true the playlist is public, false the playlist is private, null the playlist status is not relevant. 
     */
    public public?: boolean;

    /** 
     * Information about the tracks of the playlist. Note, a track object may be null. This can happen if a track is no longer available. 
     */
    public tracks?: PlaylistTrack[];

    /**
     * To create a js object conataing camel case keys of the SimplifiedPlaylist and Playlist data with additional functions.
     * 
     * @param data The raw data received from the api.
     * @param client The spotify client.
     * @example const playlist = new Playlist(fetchedData, client);
     */
    public constructor(data: SimplifiedPlaylist | RawPlaylist, client: Client) {
        this.collaborative = data.collaborative;
        this.description = data.description;
        this.externalURL = data.external_urls;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.owner = createCacheStruct('users', client, data.owner);
        this.snapshotID = data.snapshot_id;
        this.uri = data.uri;
        this.type = data.type;
        
        if (Array.isArray(data.tracks)) {
            this.totalTracks = data.tracks.length;
            this.public = (data as RawPlaylist).public as boolean;
            this.totalFollowers = (data as RawPlaylist).followers.total;
            this.tracks = createCachedPlaylistTracks(client, (data as RawPlaylist).tracks);
        } else this.totalTracks = data.tracks.total;
    }

    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    public makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

}

function createCachedPlaylistTracks(client: Client, rawPlaylistTracks: RawPlaylistTrack[]): PlaylistTrack[] {
    if (client.cacheSettings.playlistTracks) return rawPlaylistTracks.map(x => {
        let track;

        switch (x.track?.type) {
            case "track":
                // @ts-ignore
                track = new Track(x.id, x);
                Cache.tracks.set(track.id, track);
                break;
        }

        return {
            addedAt: x.added_at,
            addedBy: createCacheStruct('users', client, x.added_by),
            isLocal: x.is_local,
            track
        } as PlaylistTrack;
    });

    else return rawPlaylistTracks.map(x => {
        let track;

        switch (x.track?.type) {
            case "track":
                // @ts-ignore
                track = new Track(x.id, x);
                break;
        }

        return {
            addedAt: x.added_at,
            addedBy: createCacheStruct('users', client, x.added_by),
            isLocal: x.is_local,
            track
        } as PlaylistTrack;
    });
}