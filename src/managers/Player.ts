import type { Client } from "../Client";

export class Player {

    public constructor(client: Client) {
        Object.defineProperty(this, 'client', { value: client });
    }

}