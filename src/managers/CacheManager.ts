import Client from "../Client";

/**
 * This method is used to manage cache for your client!
 * 
 * @param client Your spotify client
 */
export default async function manageCache(client: Client): Promise<void> {
    const options = client.cacheOptions;

    if(options.cacheCurrentUser){
        var useroptions = options.cacheCurrentUser;
        
        if(useroptions == true){
            useroptions = {
                profile: true
            }
        }

        if(useroptions.profile){
            await client.user.me();
        }
    }

    client.onReady();
}