const express = require('express');
const controller = require('../controller/api.controller')
const router = express.Router();
const { check } = require('express-validator');
const moment = require('moment');
const eventModel = require('./../models/event');
const passport = require("passport");

const auth = function(req, res, next) {
   passport.authenticate('jwt', {session: false, failureRedirect: "/loin"}, (err, user, info) => {
        if(!user){
            res.redirect("/login");
        }
        else{
            next();
        }
   })(req, res, next);
}
router.use(auth);

router.get('/event', controller.event.get);

router.post('/event',(req, res, next) => {
    //Check to see if submited info is valid
    var failFlag = false;
    var err = {};
    err.message = "The following issues are pressent";
    if(!req.body.name){
        failFlag = true;
        err.message += ": name feild is missing";
    }
    //... add the rest of the checks later
    if(failFlag){
        res.status(406).send(err.message);
    }
    next();
}, controller.event.insert);

router.put('/event/:id', controller.event.update)

router.delete('/event/:id', controller.event.delete)

var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })

router.post('/event/images', [
                upload.single('image'),
                check('eventId').exists().withMessage('EventId is Required Field').custom(async function(value){
                    try {
                        var data = await eventModel.findById(value);
                        if (data.length == 0) {
                            // not found error
                            return Promise.reject('eventId is invalid')
                        }
                    } catch (error) {
                        return Promise.reject('eventId is invalid')
                    }
                    return true;
                }),
            ],controller.event.addImage)

router.delete('/event/images', [check('imageId').exists().withMessage('imageId is Required Field').custom(async function(value){
    try {
        var data = await eventModel.findById(value);
        if (data.length == 0) {
            // not found error
            return Promise.reject('imageId is invalid')
        }
    } catch (error) {
        return Promise.reject('imageId is invalid')
    }
    return true;
})],controller.event.removeImage)

router.get('/event/images', [check('eventId').exists().withMessage('eventId is Required Field').custom(async function(value){
    try {
        var data = await eventModel.findById(value);
        if (data.length == 0) {
            // not found error
            return Promise.reject('eventId is invalid')
        }
    } catch (error) {
        return Promise.reject('eventId is invalid')
    }
    return true;
})],controller.event.getAllImages)

module.exports = router;
