const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()

const port = process.env.PORT||3000

const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{

    res.render('index',{
        title:'Weather App',
        name:'Abhishek'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Abhishek'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Abhishek'
    })
})
app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Address must be provided!'
        })
    }else{
        geocode(req.query.address,(error,data = {})=>{
            if(error)
            {
                return  res.send({
                     error
                })
            }
            
            forecast(data.latitude,data.longitude,(err,msg)=>{
                if(error)
                {
                return  res.send({
                    error: err
                })
                }
                else
                {
                    res.send({
                        forecast: msg.forecast,
                        location:msg.location,
                        address:req.query.address
                     })
                   
                }
            })
            
        })
    }
})



app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Abhishek"
    })
})


app.listen(port,()=>{
    console.log("Running on port "+port+"...")
})