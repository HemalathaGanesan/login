const express=require('express')
const router=express.Router()
const config=require('../config/main')
const jwt = require('jsonwebtoken');
const passport=require('passport')
const User=require('../models/user.js')






//register new user
router.post('/register',function(req,res){
    if(!req.body.email || !req.body.password){
        res.json({success:false,message:'please enter email and password'})
    }else{
        var newUser=new User({
            email:req.body.email,
            password:req.body.password
        })
        newUser.save(function(err){
            if(err){
                return res.json({success:false,message:'The email address already exits'})
            }
            res.json({success:true,message:'Successfully created new user'})        
        })
    }
})

//Authenticate user and get jwt
router.post('/authenticate',function(req,res){
    User.findOne({
        email:req.body.email},function(err,user){
            if(err) throw err

            if(!user){
                res.send({success:false,message:'Authentication failed,user not found'})
            }else{
                user.comparePassword(req.body.password,function(err,isMatch){
                    if(isMatch && !err){
                      var token=jwt.sign(user.toJSON(),config.secret,{
                          expiresIn:10000
                      })
                      res.json({success:true,token:'JWT'+token})
                    }else{
                        res.send({success:false,message:'Authentication failed,password did not match'})
                    }
                })
            }
        })
})

// protect dashboard route with jwt
router.get('/dashboard',passport.authenticate('jwt',{session:false}),function(req,res){
    res.send('user id is:'+req.user._id)
})

router.get('/',function(req,res){
    res.send("hello")
})


module.exports=router