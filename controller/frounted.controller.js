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
            events[i].stratDate = moment(events[i].eventStartDate, "dd/mm/yyyy hh:mm:ss").format('DD')
            events[i].startMonth = moment(events[i].eventStartDate, "dd/mm/yyyy hh:mm:ss").format('MMM')
            events[i].startYear = moment(events[i].eventStartDate, "dd/mm/yyyy hh:mm:ss").format('YYYY')
        }
        res.render('index', { events: events, layout: null });

    }
}

module.exports = frountedController