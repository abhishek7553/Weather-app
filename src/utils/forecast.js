const request = require("request")

const forecast = (lang,long, callback) => {
    const url='http://api.weatherstack.com/current?access_key=6253441e4737e681704e1caf5d6dda37&units=f&query='+lang+','+long
    
    request({url:url, json:true},(error,response)=>{
    
        if(error){
            
            callback('Unable to connect!',undefined)
        }else if(response.body.error==0){ 
            
            callback('Unable to find location!',undefined)
        }else{
            
            message =  response.body.current.weather_descriptions[0]+'. It is '+response.body.current.temperature+' degree Fahrenheit out. There is '+response.body.current.precip+'% chance of rain.'
            
            callback(undefined,{
                location:response.body.location.name +','+ response.body.location.region +','+response.body.location.country   ,
                forecast : message
            })
        }
    })
}

module.exports = forecast