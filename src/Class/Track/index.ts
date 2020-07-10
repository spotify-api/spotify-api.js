import axios from 'axios'
const spotifyData = require('spotify-url-info')
const hexRgb = require('hex-rgb')
class track{
 token:string
 constructor(oauth:string){
    if(!oauth)throw new Error('(Spotify-api.js)No OAuth token was Provided')
    this.token = oauth;
 }
 async search(q:string,limit:null|number|string){
   if(!q)throw new Error('No search Query was provided')
   if(!limit)limit = 1
   try{
   const {data:res} = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&market=US&limit=${limit}`,{
     headers:{
       'Authorization':`Bearer ${this.token}`
     }
   })
   if(!res['tracks'].items.length)return 'No results found'
   return res['tracks'].items
   }catch(e){Promise.reject('(Spotify-api.js)Invalid Token')}
  }
  async get(trackid:string){
    if(!trackid)throw new Error("No track ID was provided")
    try{
    const {data:res} = await axios.get(`https://api.spotify.com/v1/tracks/${trackid}`,{
      headers:{
        "Authorization":`Bearer ${this.token}`
      }
    })
    let spot =res.external_urls.spotify
    let data = await spotifyData.getData(spot)
    const match =hexRgb(data.dominantColor,{format:'array'})
   let c ='white'
   if(match[0]>150)c='black'
    res.hex = data.dominantColor
    res.codeImg=`https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(1)}/${c}/1080/spotify:track:${res.id}`
    return res
    }catch(e){Promise.reject('(Spotify-api.js)Invalid Token or ID was provided')}
  }
  async advanced(query:string){
   const res = await this.search(query,1)
   if(res === 'No results found')return 'No results found'
   let spot =res[0].external_urls.spotify
   let data = await spotifyData.getData(spot)
   const match =hexRgb(data.dominantColor,{format:'array'})
   let c ='white'
   if(match[0]>150)c='black'
   res[0].hex = data.dominantColor
   res[0].codeImg=`https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(1)}/${c}/1080/spotify:track:${res[0].id}`
   return res
  }
}
export default track