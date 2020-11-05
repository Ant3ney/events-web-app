const User = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const constant = require('../constant');
const passport = require("passport");
const hashCost = 10;

module.exports.createUser = async (req, res) => {
  let userData = req.body;
  try {
    let user = await User.findOne({name: userData.name});
    if (user) {
      res.status(409).json({
        message: 'User already exists'
      });
      return;
    }
    console.log("User Data: " + userData);
    console.log("User Data password: " + userData.password);
    console.log("User Data password: " + req.body.password);
    bcrypt.hash(userData.password, hashCost, (err, hash) => {
      if(err){
        console.log("something went wrong in create password");
        console.log(err);
        res.status(400).json({err: err});
        return;
      }
      User.create({name: userData.name, passwordHash: hash, userType: "user"}, (err, user) => {
        if(err){
          console.log("something went wrong in create user");
          console.log(err);
          res.status(400).json({err: err});
          return;
        }
        console.log("New name: " + user.name);
        res.status(200).json({
          user: user
        });
      });
    });
    
  } catch (err) {
    res.status(400).json({
      message: 'Unable to create the user' + " " + err.message
    });
  }
};

module.exports.reValidateKey = (req, res, next) => {
  passport.authenticate('jwt', {session: false, failureRedirect: "/login"}, (err, user, info) => {
    if(err){
      console.error("Something went wrong");
      console.error(err.message);
      res.status(401).json(err);
    }
    else if(!user){
      console.error("No user was found with that username");
      res.status(401).json({message: 'no user was found with that jwt'});
    }
    else{
      const payload = {
        username: user.name,
        expires: Date.now() + constant.JWT_EXPIRATION_MS,
      };
      const token = jwt.sign(JSON.stringify(payload), constant.SECRET);
      res.cookie('jwt', jwt, { httpOnly: true, secure: true });
      res.cookie("token", token.toString());
      user.jwtApiKey = token.toString();
      user.save((err, user) => {
        if(err){
          console.error("Something went wrong");
          console.error(err.message);
          res.status(401).json(err);
          return;
        }
        res.status(200).json(user);
      });
    }
  })(req, res, next);
}

module.exports.updateUser = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    let userId = req.params.user_id;
    let userData = req.body;
    try {
      User.findOne({_id: userId}, (err, user) => {
        if (!user) {
          res.status(404).json({
            message: 'User not found'
          });
        }
        if (userData.password) {
          bcrypt.hash(userData.password, hashCost, (err, passwordHash) => {
            user.passwordHash = passwordHash;
            user.save((err, user) => {
              console.log("User sucesfull updated password");
              res.status(200).json({
                user: user
              });
            });
          });
        }
      });
      

    } catch (err) {
      res.status(400).json({
        message: 'Unable to update the user'
      });
    }
  })(req, res, next);
};

module.exports.isValid = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user) => {
    if(err){
      res.status(401).json({
        isValid: false,
        message: err.message
      });
      return;
    }
    else if(!user){
      res.status(401).json({
        isValid: false,
        message: "No user autenticated with that jwt token"
      });
      return;
    }
    res.status(200).json({
      isValid: true,
      user: user,
      message: "User found"
    });
  })(req, res, next);
}