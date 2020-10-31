//load models
const mongoose =  require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const eventModel = require('./../models/event')
const { validationResult } = require('express-validator');
const moment = require('moment');
const eventImagesModel = require('./../models/eventImages')
const agenda = require('./../jobs/agenda');
const constant = require('./../constant');
const passport = require("passport");
const here = require("../utilities/here");
const authUtil = require("../utilities/authentication");

const apiController = {
    event:{
        get:function(req, res, next){
            eventModel.find({visibility: "public"},'_id name addressLine_1 addressLine_2 region city postCode eventStartDate eventEndDate notes status visibility geocode')
            .sort('-eventStartDate')
            .then((data) => {
                //returns {data, user} in promise format
                return(
                    new Promise((resolve, reject) => {
                        authUtil.getUserFromJwt(req)
                        .then((user) => {
                            if(!user){
                                reject("No user found");
                            }
                            else{
                                console.log("A user exzists below")
                                console.log(user);
                                var dbInfo = {};
                                dbInfo.data = data;
                                dbInfo.user = user;
                                resolve(dbInfo);
                            }
                        })
                        .catch((err) => {
                            reject(err);
                        });
                    }
                ));            
            })
            .then((dbInfo) => {
                //If you need to user the argument for something then you canot promise chain
                var data = dbInfo.data;
                var user = dbInfo.user;

                console.log("dbInfo below");
                console.log(dbInfo);
                return new Promise((resolve, reject) => {
                    eventModel
                    .find({createdBy: user._id}, '_id name addressLine_1 addressLine_2 region city postCode eventStartDate eventEndDate notes status visibility geocode')
                    .then((userEvents) => {
                        resolve({
                            allEvents: data,
                            userEvents: userEvents
                        });
                    })
                    .catch((err) => {
                        reject(err);
                    });
                });
            })
            .then((events) => {
                res.json(events);
                return;
            })
            .catch(function(err){
                console.log(err);
                return res.status(404).json({
                    message:'Event not added'
                })
            });
        },
        insert:function(req, res, next){
            var eventStartDate = moment(req.body.eventStartDate,'DD/MM/YYYY hh:mm:ss');
            var eventEndDate = moment(req.body.eventEndDate,'DD/MM/YYYY hh:mm:ss');

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array()[0].msg });
            }
            else if (eventStartDate > eventEndDate) {
                return res.status(422).json({ errors: 'EndDate must be bigger than start Date' });
            }
            var {
                name,
                addressLine_1,
                addressLine_2,
                country,
                region,
                city,
                postCode,
                notes,
                status,
                category,
                visibility

            } = req.body;

            var addresString = addressLine_1 + " " + city + " " + country;
            var eventData = {
                name,
                addressLine_1,
                addressLine_2,
                country,
                region,
                city,
                postCode,
                eventStartDate,
                eventEndDate,
                notes,
                status : status ? status:'Pending',
                category,
                visibility
            }
            eventData.api_key = req.cookies['token'];
            here.getGeocode(addresString).then((cords) => {
                if(!cords){
                    console.log("Addres (" + addresString + ") could not be found");
                }
                else{
                    eventData.geocode = {
                        lat: cords.lat,
                        long: cords.lng
                    }
                }
                return Promise.resolve()
            }).then(() => {
                //get curently loged in user document
                return new Promise((resolve, reject) => {
                    passport.authenticate('jwt', {session: false, failureRedirect: "/loin"}, (err, user, info) => {
                    if(!user){
                        reject({message: "No user found"})
                    }
                    else{
                        eventData.createdBy = user._id;
                        eventModel.create(eventData).then(function(data){
                            agenda.schedule(moment(eventEndDate).format('YYYY-MM-DD HH:mm:ss'),'removeEvent',{
                                _id:data._id,
                                eventEndDate:eventEndDate
                            });
                        
                            var {
                                _id,
                                name,
                                addressLine_1,
                                addressLine_2,
                                country,
                                region,
                                city,
                                postCode,
                                eventStartDate,
                                eventEndDate,
                                geocode,
                                notes,
                                status,
                                category,
                                visibility,
                                createdBy
                            } = data;
                            resolve ({
                                event:{
                                    _id,
                                    name,
                                    addressLine_1,
                                    addressLine_2,
                                    country,
                                    region,
                                    city,
                                    postCode,
                                    eventStartDate,
                                    eventEndDate,
                                    geocode,
                                    notes,
                                    status,
                                    category,
                                    visibility,
                                    createdBy
                                }
                            });
                        
                            }).catch(function(err){
                                console.log(err);
                                var obj = err.errors[Object.keys(err.errors)[0]];
                                reject({
                                    message: obj.message
                                })
                            });
                        }
                    })(req, res, next);
                });
            }).then(newEvent => {
                res.json(newEvent);
            }).catch(err => {
                console.log("Something went wrong in create event promise");
                console.log(err);
                res.status(401).json(err);
            });
        },
        update:function(req, res, next){
            var eventStartDate = moment(req.body.eventStartDate,'DD/MM/YYYY hh:mm:ss');
            var eventEndDate = moment(req.body.eventEndDate,'DD/MM/YYYY hh:mm:ss');
            var update = req.body;

            update._id = req.params.id;
            update.eventStartDate = eventStartDate;
            update.eventEndDate = eventEndDate;
            update.api_key = req.cookies['token'];

            var addresString = update.addressLine_1 + " " + update.city + " " + update.country;
            here.getGeocode(addresString).then((cords) => {
                if(!cords){
                    console.log("Addres (" + addresString + ") could not be found");
                }
                else{
                    update.geocode = {
                        lat: cords.lat,
                        long: cords.lng
                    }
                }
                return new Promise((resolve, reject) => {
                    passport.authenticate('jwt', {session: false, failureRedirect: "/login"}, (err, user) => {
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(user)
                        }
                    })(req, res, next);
                });
            }).then((user) => {
                return new Promise((resolve, reject) => {
                    if(!user){
                        reject({message: "Not logged in"});
                    }
                    else{
                        console.log("Here03");
                        update.createdBy = user._id;
                        eventModel.findByIdAndUpdate(req.params.id, update , {new: true}, (err, updatedEvent) => {
                            if(err){
                                reject({
                                    error: err.message,
                                    message:'Event not found'
                                });
                            }
                            else if(updatedEvent === null){
                                reject({message: "Event not found"});
                            }
                            else{
                                var {
                                    _id,
                                    name,
                                    addressLine_1,
                                    addressLine_2,
                                    country,
                                    region,
                                    city,
                                    postCode,
                                    eventStartDate,
                                    eventEndDate,
                                    geocode,
                                    notes,
                                    status,
                                    category,
                                    visibility,
                                    createdBy
                                } = updatedEvent;
                                agenda.schedule(moment(eventEndDate).format('YYYY-MM-DD HH:mm:ss'),'removeEvent',{
                                    _id:updatedEvent._id,
                                    eventEndDate:eventEndDate
                                });
                                resolve({
                                    event:{
                                        _id,
                                        name,
                                        addressLine_1,
                                        addressLine_2,
                                        country,
                                        region,
                                        city,
                                        postCode,
                                        eventStartDate,
                                        eventEndDate,
                                        geocode,
                                        notes,
                                        status,
                                        category,
                                        visibility,
                                        createdBy
                                    }
                                });
                            }
                        });
                    }
                });
            }).then((updatedEvent) => {
                res.json((updatedEvent));
            }).catch((err) => {
                console.log("Something went wrong in here promise in api controller");
                console.log(err);
                res.json({err});
            })
        },
        delete:function (req,res) {
            eventModel.find({}, (err, allEvents) => {
                allEvents.forEach((theEvent) => {
                    console.log(req.params.id + " != " + theEvent._id);
                });
            });
            const filter = {_id: req.params.id}
            eventModel.find(filter).then(function(event){
                console.log("Event below");
                console.log(event);
                if (event.length <= 0) {
                    console.log("Failed for other reason");
                    return Promise.reject('Event not found');
                }
                //Check if user has acess
                event[0].remove();
                return res.status(200).json({
                    message:'success'
                })
            }).catch(function(err){
                console.log("Faild because of error");
                return res.status(404).json({
                    test: "This is a test value",
                    error: err,
                    message:'Event not found'
                })
            });
        },
        addImage:function(req,res){
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array()[0].msg });
            }

            var eventImagesObj = new eventImagesModel;
            eventImagesObj.eventId = req.body.eventId;
            eventImagesObj.originalname = req.file.originalname;
            eventImagesObj.filename = req.file.filename;
            eventImagesObj.mimetype = req.file.mimetype;
            eventImagesObj.size = req.file.size;
            eventImagesObj.save();
            return res.status(200).json({
                imageId:eventImagesObj._id,
                imagePath:constant.BASE_URL + '/' + constant.EVENT_FILE_PATH + '/' +req.file.filename
            })
        },
        removeImage:function (req,res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array()[0].msg });
            }
            var eventImagesObj = eventImagesModel.find({'id':req.body.imageId}).delete();

            return res.status(200).json({
                 message:'success'
            })
        },
        getAllImages:async function(req,res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array()[0].msg });
            }
            var eventImagesObj = await eventImagesModel.find({'eventId':req.body.eventId})

            var responce = []

            for (let i = 0; i < eventImagesObj.length; i++) {
                const element = eventImagesObj[i];
                responce.push({
                    imageId:element._id,
                    imagePath:constant.BASE_URL + '/' + constant.EVENT_FILE_PATH + '/' + element.filename
                });
            }

            return res.status(200).json({
                images:responce
            })
        }
    }
}

module.exports = apiController;

