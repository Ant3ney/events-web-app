//load models
const mongoose =  require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const user = require('./../models/user')
const eventModel = require('./../models/event')
const { validationResult } = require('express-validator');
const moment = require('moment');

const nodemailer = require("nodemailer");
async function send_mail(sender,subject,html){
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "", // generated ethereal user
            pass: "" // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let info = await transporter.sendMail({
        // from: process.env.ADMIN_EMAIL_FROM, // sender address
        from: '', // sender address
        to: sender, // list of receivers
        subject: subject, // Subject line
        html: html // html body
    })
    console.log(info);
}

const apiController = {
    event:{
        
        get:function(req,res){
            eventModel.find({},'_id name addressLine_1 addressLine_2 region city postCode eventStartDate eventEndDate notes status').then(function(data){
                return res.status(200).json({
                    event:data,
                })
            }).catch(function(err){
                console.log(err);
                return res.status(404).json({
                    message:'Event not added'
                })
            });
        },
        insert:function(req,res){

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array()[0].msg });
            }
            var {
                name,
                addressLine_1,
                addressLine_2,
                region,
                city,
                postCode,
                eventStartDate,
                eventEndDate,
                notes,
                status
            } = req.body;
            
            var eventData = {
                name,
                addressLine_1,
                addressLine_2,
                region,
                city,
                postCode,
                eventStartDate,
                eventEndDate,
                notes,
                status : status ? status:'Pending'
            }
            eventData.api_key = req.user.auth_key;

            eventModel.create(eventData).then(function(data){
                var {
                    _id,
                    name,
                    addressLine_1,
                    addressLine_2,
                    region,
                    city,
                    postCode,
                    eventStartDate,
                    eventEndDate,
                    notes,
                    status
                } = data;
                return res.status(200).json({
                    event:{
                        _id,
                        name,
                        addressLine_1,
                        addressLine_2,
                        region,
                        city,
                        postCode,
                        eventStartDate,
                        eventEndDate,
                        notes,
                        status
                    }
                })
            }).catch(function(err){
                console.log(err);
                var obj = err.errors[Object.keys(err.errors)[0]];
                return res.status(404).json({
                    message:obj.message
                })
            });
        },
        update:function(req,res){
            
            var update = req.body

            const filter = {_id:req.params.id}

            update.api_key = req.user.auth_key;

            eventModel.findOneAndUpdate(filter, {$set:update},{upsert: true }).then(function(data){
               var responce = {
                    _id,
                    name,
                    addressLine_1,
                    addressLine_2,
                    region,
                    city,
                    postCode,
                    eventStartDate,
                    eventEndDate,
                    notes,
                    status
                } = data;
                return res.status(200).json({
                    event:{
                        _id,
                        name,
                        addressLine_1,
                        addressLine_2,
                        region,
                        city,
                        postCode,
                        eventStartDate,
                        eventEndDate,
                        notes,
                        status
                    }
                })
            }).catch(function(err){
                return res.status(404).json({
                    message:'Event not found'
                })
            });
        },
        delete:function (req,res) {
            const filter = {_id:req.params.id}
            eventModel.find(filter).then(function(event){
                if (event.length > 0) {
                    return Promise.reject('Event not found');
                }
                event[0].remove();
                return res.status(200).json({
                    message:'success'
                })
            }).catch(function(err){
                console.log(err)
                return res.status(404).json({
                    message:'Event not found'
                })
            }); 
        },
        userConfirm:function(req,res){
            
        }
    }
}

module.exports = apiController;

