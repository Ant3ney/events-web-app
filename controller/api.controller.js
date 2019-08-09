//load models
const mongoose =  require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const user = require('./../models/user')
const eventModel = require('./../models/event')

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
            eventModel.create(req.body).then(function(data){
                return res.status(200).json({
                    eventId:data._id,
                    message:'success'
                })
            }).catch(function(err){
                console.log(err);
                return res.status(404).json({
                    message:'err'
                })
            });
        },
        insert:function(req,res){
            const filter = {_id:req.params._id}, update = req.body.update
            eventModel.findOneAndUpdate(filter, update).then(function(data){
                return res.status(200).json({
                    eventId:data._id,
                    message:'success'
                })
            }).catch(function(err){
                console.log(err);
                return res.status(404).json({
                    message:'err'
                })
            });
        },
        update:function(req,res){

        },
        delete:function (req,res) {
            
        },
        userConfirm:function(req,res){

        }
    }
}

module.exports = apiController;

