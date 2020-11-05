var nJwt = require('njwt');
var constant = require("../constant");
var User = require("../models/user");

var authUtil = {
    isCurrentJwtValid: (req) => {
        var currentJtw = req.cookies['token'];
        return new Promise((resolve, reject) => {
            nJwt.verify(currentJtw, constant.SECRET, (err, verifiedJwt) => {
                if(err){
                    console.error("Something went wrong in authentication utility isCurrentJwtValid functions promise that has to do with nJwt");
                    console.error(err.message)
                    reject(err);
                }
                else{
                    resolve(verifiedJwt);
                }
            });
        });
    },
    getUserFromJwt: (req) => {
        var currentJtw = req.cookies['token'];
        return new Promise((resolve, reject) => {
            authUtil.isCurrentJwtValid(req).then((vJwt) => {
               return new Promise((resolve, reject) => {
                   User.findOne({jwtApiKey: currentJtw}, (err, user) => {
                        resolve(user);
                   });
               }); 
            })
            .then((user) => {
                resolve(user);
            });
        });
    },
    removeJwtFromResponse: (res) => {
        res.cookie('token', 'unset', {httpOnly: false, secure: true, sameSite: "none"});
    }
}

module.exports = authUtil;