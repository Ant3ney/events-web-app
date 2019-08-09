//load models
const mongoose =  require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const user = require('./../models/user')

const nodemailer = require("nodemailer");
async function send_mail(sender,subject,html){
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "helpiee.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "bharattalk@helpiee.com", // generated ethereal user
            pass: "Kwj&k83)$Y;q" // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let info = await transporter.sendMail({
        // from: process.env.ADMIN_EMAIL_FROM, // sender address
        from: 'bharattalk@helpiee.com', // sender address
        to: sender, // list of receivers
        subject: subject, // Subject line
        html: html // html body
    })
    console.log(info);
}

const apiController = {

}

module.exports = apiController;

