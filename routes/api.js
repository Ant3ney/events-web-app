const express = require('express');
const controller = require('../controller/api.controller')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const moment = require('moment');

const auth = function (req, res, next) {

    //get the token from the header if present
    const token = req.headers.token;
    //if no token found, return response (without going to the next middelware)
    const api_keys = [
        "1f666199-f09a-48ca-b96d-3b96763fd2d7"
    ]
    if (!token && api_keys.findIndex(token) == -1) {
        return res.json({
            statusCode:401,
            contest:{},
            message: 'unAuthorized'
        });
    }

    try {

        //if can verify the token, set req.user and pass to next middleware

        req.auth.api_key = token;

        next();

    } catch (ex) {

        //if invalid token
        console.log(ex)
        return res.json({
            statusCode:401,
            contest:ex,
            message: 'unAuthorized'
        });

    }

}

module.exports = router;



