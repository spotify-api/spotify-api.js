import Client from "../Client";

/**
 * This method is used to manage cache for your client!
 * 
 * @param client Your spotify client
 */
export default async function manageCache(client: Client): Promise<void> {
    const options = client.cacheOptions;

    if(options.cacheCurrentUser){
        var useroptions = options.cacheCurrentUser as any;
        
        if(useroptions == true){
            await client.user.info();
        } else {
            await client.user.info();
            
            if(useroptions.affinity == true){
                await client.user.getTopTracks();
                await client.user.getTopArtists();
            } else if(typeof useroptions.affinity == 'object'){
                if(useroptions.affinity.artists) await client.user.getTopArtists();
                else if(useroptions.affinity.tracks) await client.user.getTopTracks();
            }
        }
    }

    client.onReady();
}