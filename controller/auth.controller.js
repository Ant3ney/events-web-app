const User = require('../models/user');
const express = require('express');
const router  = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require('passport');
const constant = require('../constant');
const { json } = require('body-parser');
var cookieParser = require('cookie-parser');
var nJwt = require('njwt');

//Handles login
module.exports = (req, res, next) => {
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
            res.cookie('jwt', jwt, { httpOnly: true, secure: true });
            res.cookie("token", token.toString());
            user.jwtApiKey = token.toString();
            user.save((err, user) => {
              res.redirect('/');
            });
          }
          else{//Current machine needs to be updated
            console.log("User exzists but machine dose not have token");
            res.cookie('jwt', jwt, { httpOnly: true, secure: true });
            res.cookie("token", user.jwtApiKey);
            res.json(user);
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
          res.cookie('jwt', jwt, { httpOnly: true, secure: true });
          res.cookie("token", token.toString());
          user.jwtApiKey = token.toString();
          user.save((err, user) => {
            res.json(user);
          });
        });
      });
    }
    else{//The browser has jwt saved and db has jwt saved. Any further authentication is useless
      res.redirect('/');
    }
  })(req, res, next);
};
