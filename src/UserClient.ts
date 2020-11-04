import { MissingParamError, UnexpectedError } from "./Error";
import Spotify from "./Spotify";
import UserPlayer from "./UserPlayer";
import Auth from './lib/Auth';

class UserClient extends Spotify{

    auth: Auth;
    player: UserPlayer;

    constructor(token?: string){
        super(token);

        this.auth = new Auth();
        this.player = new UserPlayer(this.token);
    };

    async info(): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        link: `v1/me`
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async getTopArtists(): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        link: `v1/me/top/artists`
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async getTopTracks(): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        link: `v1/me/top/tracks`
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async getPlaylists(limit?: number): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        link: `v1/me/playlists`,
                        params: {
                            limit
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async getAlbums(limit?: number): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        link: `v1/me/albums`,
                        params: {
                            limit
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async getShows(limit?: number): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        link: `v1/me/shows`,
                        params: {
                            limit
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async getTracks(limit?: number): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        link: `v1/me/tracks`,
                        params: {
                            limit
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async deleteAlbums(ids: string[]): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!ids || !Array.isArray(ids)) reject(new MissingParamError('missing ids'));

                resolve(
                    await this.fetch({
                        method: 'DELETE',
                        link: `v1/me/albums`,
                        params: {
                            ids: ids.join(',')
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async deleteTracks(ids: string[]): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!ids || !Array.isArray(ids)) reject(new MissingParamError('missing ids'));

                resolve(
                    await this.fetch({
                        method: 'DELETE',
                        link: `v1/me/tracks`,
                        params: {
                            ids: ids.join(',')
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async deleteShows(ids: string[]): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!ids || !Array.isArray(ids)) reject(new MissingParamError('missing ids'));

                resolve(
                    await this.fetch({
                        method: 'DELETE',
                        link: `v1/me/shows`,
                        params: {
                            ids: ids.join(',')
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async addAlbums(ids: string[]): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!ids || !Array.isArray(ids)) reject(new MissingParamError('missing ids'));

                resolve(
                    await this.fetch({
                        method: 'PUT',
                        link: `v1/me/albums`,
                        params: {
                            ids: ids.join(',')
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async addTracks(ids: string[]): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!ids || !Array.isArray(ids)) reject(new MissingParamError('missing ids'));

                resolve(
                    await this.fetch({
                        method: 'PUT',
                        link: `v1/me/tracks`,
                        params: {
                            ids: ids.join(',')
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async addShows(ids: string[]): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!ids || !Array.isArray(ids)) reject(new MissingParamError('missing ids'));

                resolve(
                    await this.fetch({
                        method: 'PUT',
                        link: `v1/me/shows`,
                        params: {
                            ids: ids.join(',')
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async followsUser(ids: string[]): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!ids || !Array.isArray(ids)) reject(new MissingParamError('missing ids'));

                resolve(
                    await this.fetch({
                        link: `v1/me/following/contains`,
                        params: {
                            ids: ids.join(','),
                            type: 'user'
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async followsArtist(ids: string[]): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!ids || !Array.isArray(ids)) reject(new MissingParamError('missing ids'));

                resolve(
                    await this.fetch({
                        link: `v1/me/following/contains`,
                        params: {
                            ids: ids.join(','),
                            type: 'artist'
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async followUser(ids: string[]): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!ids || !Array.isArray(ids)) reject(new MissingParamError('missing ids'));

                resolve(
                    await this.fetch({
                        method: 'PUT',
                        link: `v1/me/following`,
                        params: {
                            ids: ids.join(','),
                            type: 'user'
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async followPlaylist(id: string): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!id) reject(new MissingParamError('missing id'));

                resolve(
                    await this.fetch({
                        method: 'PUT',
                        link: `v1/playlists/${id}/followers`,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async followArtist(ids: string[]): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!ids || !Array.isArray(ids)) reject(new MissingParamError('missing ids'));

                resolve(
                    await this.fetch({
                        method: 'PUT',
                        link: `v1/me/following`,
                        params: {
                            ids: ids.join(','),
                            type: 'artist'
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async unfollowUser(ids: string[]): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!ids || !Array.isArray(ids)) reject(new MissingParamError('missing ids'));

                resolve(
                    await this.fetch({
                        method: 'DELETE',
                        link: `v1/me/following`,
                        params: {
                            ids: ids.join(','),
                            type: 'user'
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async unfollowPlaylist(id: string): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!id) reject(new MissingParamError('missing id'));

                resolve(
                    await this.fetch({
                        method: 'DELETE',
                        link: `v1/playlists/${id}/followers`,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async unfollowArtist(ids: string[]): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!ids || !Array.isArray(ids)) reject(new MissingParamError('missing ids'));

                resolve(
                    await this.fetch({
                        method: 'DELETE',
                        link: `v1/me/following`,
                        params: {
                            ids: ids.join(','),
                            type: 'artist'
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async following(artists?: boolean): Promise<any> {

        return new Promise(async(resolve, reject) => {
            try{
                artists = Boolean(artists);

                resolve(
                    await this.fetch({
                        link: `v1/me/following`,
                        params: {
                            type: (artists ? 'artist' : 'user')
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };

    async login(
        options: {
            client_id: string;
            client_secret: string;
            redirect_uri: string;
            code: string;
        }
    ): Promise<void> {
        this.token = (await this.auth.refresh(options)).access_token;
        this.player = new UserPlayer(this.token);
    };
    
};

export default UserClient;