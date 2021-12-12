const request = require("request")

const geocode = (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1IjoiYWJoaXNoZWsyMSIsImEiOiJja3Uyc2Rpdjkya3E0MnVwOHg0bGxrcXV2In0.Hd4uFnysHLVGEjHAEiVpcw'

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect',undefined)
        }else if(response.body.features.length==0){
            callback('Unable to find',undefined)
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode