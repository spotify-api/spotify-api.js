import { 
    PublicUser, 
    PrivateUser,  
    SimplifiedArtist, 
    SimplifiedTrack, 
    SimplifiedPlaylist,
    SimplifiedAlbum,
    SimplifiedEpisode,
    SimplifiedShow,
    Artist,
    Track, 
    Playlist,
    Album,
    Episode,
    Show
} from "api-types";

/** Cache of users with raw api data. */
export const users = new Map<string, PublicUser | PrivateUser>();

/** Cache of artists with raw api data. */
export const artists = new Map<string, SimplifiedArtist | Artist>();

/** Cache of tracks with raw api data. */
export const tracks = new Map<string, SimplifiedTrack | Track>();

/** Cache of playlists with raw api data. */
export const playlists = new Map<string, SimplifiedPlaylist | Playlist>();

/** Cache of albums with raw api data. */
export const albums = new Map<string, SimplifiedAlbum | Album>();

/** Cache of episodes with raw api data. */
export const episodes = new Map<string, SimplifiedEpisode | Episode>();

/** Cache of shows with raw api data. */
export const shows = new Map<string, SimplifiedShow | Show>();