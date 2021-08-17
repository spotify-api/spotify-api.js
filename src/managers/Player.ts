import type { Client } from "../Client";

/**
 * A manager to perform actions which belongs to the spotify player web api.
 */
export class Player {

    /**
     * The client which handles all the current user's player api endpoints.
     * All the methods in this class requires the user authorized token.
     * Few functions requires spotify premium.
     * 
     * @param client The spotify api client.
     * @example const player = new Player(client);
     */
    public constructor(client: Client) {
        Object.defineProperty(this, 'client', { value: client });
    }

}