import axios from "axios";
import { Client } from "../Client";
import { SpotifyAPIError } from "../Error";

/**
 * A manager to perform actions regarding the authorization to the web api.
 */
export class AuthManager {

    /**
     * A manager to perform actions regarding the authorization to the web api.
     * 
     * @param client The spotify web api client.
     * @example const auth = new AuthManager(client);
     */
    public constructor(public client: Client) {}

    /**
     * Returns an api token from your spotify application client id and client secret!
     * 
     * @param clientID Your spotify app's client id
     * @param clientSecret Your spotify app's client secret
     * @example await auth.getApiToken('id', 'secert');
     */
    public async getApiToken(clientID: string, clientSecret: string): Promise<string> {
        try{
            const { data } = await axios({
                method: 'POST',
                url: 'https://accounts.spotify.com/api/token',
                params: {
                    grant_type: 'client_credentials',
                    token: this.client.token,
                    client_id: clientID,
                    client_secret: clientSecret
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })

            return data.access_token;
        } catch(e) {
            throw new SpotifyAPIError(e);
        }
    }

}