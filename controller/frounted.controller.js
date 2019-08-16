//load models
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const user = require('./../models/user')
const eventModel = require('./../models/event')
const { validationResult } = require('express-validator');
const moment = require('moment');

const nodemailer = require("nodemailer");

const frountedController = {
    eventList: async function(req, res, next) {
        var events = await eventModel.find()
        for (var i = 0; i < events.length; i++) {
            events[i].stratDate = moment(events[i].eventStartDate).format('DD')
            events[i].startMonth = moment(events[i].eventStartDate).format('MMM')
            events[i].startYear = moment(events[i].eventStartDate).format('YYYY')
        }
        res.render('index', { events: events, layout: null });
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
        
        res.render('details', { layout: null, event: eventObj })
    }
}

module.exports = frountedController