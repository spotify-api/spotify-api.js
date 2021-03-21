import UserClient from '../UserClient';
import Client from '../Client';

/**
 * A class to manage all player endpoints
 */
export default class PlayerManager {

    client!: Client;

    /**
     * A class to manage all player endpoints
     * 
     * @param client Your spotify client
     * @example const player = new PlayerManager(client);
     */
    constructor(client: UserClient | Client | string){
        Object.defineProperty(this, 'client', {
            value: typeof client == 'string' ? new Client(client) : (client instanceof UserClient) ? client.client : client
        })
    }

}