const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const constant = require('../constant')

//Local authentication
passport.use(new localStrategy({
    usernameField: "name",
    passwordField: "password"
}, (username, password, done) => {
    //Find out if username and password match
    User.findOne({name: username}, (err, user) => {
        if(err){
            console.log(err.message);
            return done(null, false);
        }
        else if(!user){//means no acount with specified username was found
            return done(null, false);
        }
        var hash = user.passwordHash;
        bcrypt.compare(password, hash, (err, match) => {
            if(err){
                console.log(err.message);
                return done(err, false);
            }
            else{
                if(match){//The req password matches the databace password
                    console.log("The user has logged in");
                    return done(err, user);
                }
                else{//Passwords didn't match
                    return done(err, false);
                }
            }
        })
    });
}));

//JWT Authorization
var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['token'];
    }
    return token;
};

var opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: constant.SECRET
}
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({name: jwt_payload.username}, function(err, user) {
        if (err) {
            console.log("Something went wrong");
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));