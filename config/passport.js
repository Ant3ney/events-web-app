const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");
const JwtStrategy = require('passport-jwt').Strategy;
const constant = require('../constant')
const considerLoging = require('../utilities/considerLoging');

//Local authentication
passport.use(new localStrategy({
    usernameField: "name",
    passwordField: "password"
}, (username, password, done) => {
    //Find out if username and password match
    User.findOne({name: username}, (err, user) => {
        if(err){
            console.error('error happeoned in local auth dbquery');
            console.error(err.message);
            return done(null, false);
        }
        else if(!user){//means no acount with specified username was found
            console.log("No user found in db with that name");
            return done(null, false);
        }
        var hash = user.passwordHash;
        bcrypt.compare(password, hash, (err, match) => {
            if(err){
                console.error('error happeoned in password comparison');
                console.error(err.message);
                return done(err, false);
            }
            else{
                if(match){//The req password matches the databace password
                    console.log("The user has logged in");
                    return done(err, user);
                }
                else{//Passwords didn't match
                    console.error('The suplied password was incorrect');
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
    considerLoging(console.log("Token: " + token));
    return token;
};

var opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: constant.SECRET
}
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    var err = {};
    if(!jwt_payload){
        err.message = 'jwt dose not have a payload';
        console.error(err.message);
        return done(err, false);
    }
    else if(jwt_payload && !jwt_payload.username){
        err.message = 'jwt payload dose not have username';
        console.error(err.message);
        return done(err, false);
    }
    User.findOne({name: jwt_payload.username})
    .then((user) => {
        if (user) {
            return done(null, user);
        } 
        else {
            return done(null, false);
        }
    })
    .catch((err) => {
        console.error('Something went wrong in jwt db query');
        return done(err, false);
    });
}));