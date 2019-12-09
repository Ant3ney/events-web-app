//load models
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const user = require('./../models/user')
const eventModel = require('./../models/event')
const { validationResult } = require('express-validator');
const eventImagesModel = require('./../models/eventImages')
const moment = require('moment');

const nodemailer = require("nodemailer");

const frontendController = {
    eventList: async function(req, res, next) {
        var events = await eventModel.find({}).sort('-eventStartDate')
        var today = new Date();
        for (var i = 0; i < events.length; i++) {
            events[i].stratDate = moment(events[i].eventStartDate).format('DD')
            events[i].startMonth = moment(events[i].eventStartDate).format('MMM')
            events[i].startYear = moment(events[i].eventStartDate).format('YYYY')
            events[i].yearChanged = (events[i-1] == undefined) || (events[i].startYear !== events[i-1].startYear)
            if (moment(events[i].eventStartDate).isBefore(today)) {
                events[i].eventType = 'past-event'
            } else {
                events[i].eventType = ''
            }
        }
        res.render('index', { events: events, layout: null, MAP_API_KEY: constant.MAP_API_KEY });
    },
    eventDetails: async function(req, res, next) {
        var event = await eventModel.findOne({ _id: req.params.id,status:'Pending' })
        var eventObj = {}
        eventObj.region = event.region
        eventObj.city = event.city
        eventObj.postCode = event.postCode
        eventObj.addressLine_2 = event.addressLine_2
        eventObj.addressLine_1 = event.addressLine_1
        eventObj.name = event.name
        eventObj.notes = event.notes

        eventObj.eventStartDate = moment(event.eventStartDate).format('MMMM Do YYYY, hh:mm:ss a')
        eventObj.eventEndDate = moment(event.eventEndDate).format('MMMM Do YYYY, hh:mm:ss a')

        eventObj.images = await eventImagesModel.find({'eventId':eventObj._id})

        await eventObj.images.forEach(function(item){
            item.filename = constant.BASE_URL + '/' + constant.EVENT_FILE_PATH + '/' + item.filename
        })

        res.render('details', { layout: null, event: eventObj,constant:constant })
    }
}

module.exports = frontendController
