const JwtStrategy=require('passport-jwt').Strategy
const ExtractJwt=require('passport-jwt').ExtractJwt
const User=require('./models/user')
const config=require('./main')
const passport=require('passport')

module.exports=function(passport){
    var opts={}
    opts.jwtFromRequest=ExtractJwt.fromAuthHeader()
    opts.secretOrkey=config.secret
    passport.use(new JwtStrategy(opts,function(jwt_payload,done){
        User.findOne({_id:jwt_payload._id},function(err,user){
            if(err){
                return done(err,false)
            }
            if(user){
                done(null,user)
            }else{
                done(null,false)
            }
        })
    }))
}