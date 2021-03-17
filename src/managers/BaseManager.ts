import Client from '../Client';
import { FetchOptions } from '../Util';

/**
 * Simple base manager for spotify-api.js!
 */
export default class BaseManager{

    readonly client!: Client;
    readonly fetch!: (url: string, options?: FetchOptions) => Promise<any>;

    /**
     * Simple base manager which get extended in other managers too...
     * 
     * @param client Your spotify client
     * @warning Do not use this directly!
     */
    constructor(client: Client){
        Object.defineProperties(this, {
            client: { value: client },
            fetch: { value: client.util.fetch.bind(client.util) }
        })
    }

};