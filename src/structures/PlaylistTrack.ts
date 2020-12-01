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
    addedAt: string | null;
    addedBy: PublicUser | null;
    local: boolean;

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
        
    };

    /**
     * Full info of the track
     * @readonly
     */
    get track(): Track | Episode {
        return this.data.track.description ? new Episode(this.data.track) : new Track(this.data.track);
    };

};

export default PlaylistTrack;