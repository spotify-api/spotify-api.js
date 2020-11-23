/**
 * PlaylistTrack structure
 */
import Track from "./Track";
import PublicUser from "./PublicUser";
import Episode from "./Episode";

/**
 * PlaylistTrack class
 */
class PlaylistTrack{

    data: any;
    addedAt: string;
    addedBy: PublicUser;
    local: boolean;
    track: Track | Episode;

    /**
     * **Example:**
     * 
     * ```js
     * const track = new PlaylistTrack(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     */
    constructor(data){
        
        Object.defineProperty(this, 'data', { value: data });

        this.addedAt = data.added_at;
        this.addedBy = data.added_by;
        this.local = data.is_local;
        this.track = data.track.description ? new Episode(data.track) : new Track(data.track);
        
    };

};

export default PlaylistTrack;