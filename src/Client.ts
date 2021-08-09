import { ClientOptions } from "./Interface";

/**
 * The basic client to interact with the Spotify Web API.
 */
export class Client {

    /**
     * The token of the spotify web client.
     */
    public token!: string;

    /**
     * The basic client to interact with the Spotify Web API.
     * 
     * @param options The options necessary for the client.
     * @example
     * const client = new Client({ token: "someToken" });
     */
    public constructor(options: ClientOptions | string) {
        if (typeof options == "string") this.token = options;
        else if (typeof options.token == "string") this.token = options.token;
    }

}