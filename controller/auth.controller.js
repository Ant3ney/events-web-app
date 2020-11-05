const jwt      = require('jsonwebtoken');
const passport = require('passport');
const constant = require('../constant');
var nJwt = require('njwt');
const authUtil = require("../utilities/authentication");

module.exports = {
  signIn: (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
      console.log(err);
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : 'Login failed',
          user   : user
        });
      }
  
      if(user.jwtApiKey && !req.cookies["token"]){
          //Check to see if token is expired
          nJwt.verify(user.jwtApiKey, constant.SECRET, (err, verifiedJwt) => {
            if(err){//jwt expired on another machine and needs to be reasigned
              const payload = {
                username: user.name,
                expires: Date.now() + constant.JWT_EXPIRATION_MS,
              };
              const token = jwt.sign(JSON.stringify(payload), constant.SECRET);
              //res.cookie('jwt', jwt);
              res.cookie("token", token.toString(), {httpOnly: false, secure: true, sameSite: "none"});
              user.jwtApiKey = token.toString();
              user.save((err, user) => {
                res.json(user);
              });
            }
            else{//Current machine needs to be updated
              console.warn("User exzists but machine dose not have token");
              //res.cookie('jwt', jwt);
              res.cookie("token", user.jwtApiKey, {httpOnly: false, secure: true, sameSite: "none"}).json(user);
            }
          });
      }
      else if(!user.jwtApiKey){
        const payload = {
          username: user.name,
          expires: Date.now() + constant.JWT_EXPIRATION_MS,
        };
        req.login(payload, {session: false}, (err) => {
          if (err) {
            res.status(400).json({ error });
          }
          const payload = {
            username: user.name,
            expires: Date.now() + constant.JWT_EXPIRATION_MS,
          };
          req.login(payload, {session: false}, (err) => {
            if (err) {
              res.status(400).json({ error });
            }
      
            const token = jwt.sign(JSON.stringify(payload), constant.SECRET);
            //res.cookie('jwt', jwt);
            res.cookie("token", token.toString(), {httpOnly: false, secure: true, sameSite: "none"});
            user.jwtApiKey = token.toString();
            user.save((err, user) => {
              res.json(user);
            });
          });
        });
      }
      else{//The browser has jwt saved and db has jwt saved. Any further authentication is useless
        res.json({message: "sucess"});
      }
    })(req, res, next);
  },
  signOut: (req, res) => {
    authUtil.isCurrentJwtValid(req)
    .then(() => {
      authUtil.removeJwtFromResponse(res);
      res.status(200).json({message: 'user has signed out'});
    })
    .catch((err) => {
      console.error("Something has gone wrong in auth controller sign out.")
      console.error(err);
      res.status(401).json(err);
    });
  }
}
