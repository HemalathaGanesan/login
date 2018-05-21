const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const passport=require('passport')
const config=require('./config/main')
const jwt=require('jsonwebtoken')



//use body-parser to get post request from routes API
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//initialize passport
app.use(passport.initialize())
app.use(passport.session());




//listening port
app.listen(4000,function(){
console.log("server start")
})

// landing page route
app.get('/',function(req,res){
    res.send("hello world...!!")
})

//mongodb connection
mongoose.connect('mongodb://localhost/login')
mongoose.connection.once("open",function(){
    console.log("mongodb connection successfull")
}).on("error",function(err){
console.log("connection error",err)
})

// require('./config/passport')(passport) 

//using routes
app.use('/api',require('./route/api'))