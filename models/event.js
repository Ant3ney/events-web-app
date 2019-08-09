const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    addressLine_1: {
        type: String,
    },
    addressLine_2: {
        type: String,
    },
    addressLine_3: {
        type: String,
    },
    region: {
        type: String,
    },
    city: {
        type: String,
    },
    postCode: {
        type: String,
    },
    eventStartDate:{
        type: String
    },
    eventEndDate:{
        type : Date,
    },
    status:{
        type : Number
    },
    apiKey:{
        type : String
    }
},{ timestamps: { createdAt: 'createdAt' }  })


const event = mongoose.model('Event', eventSchema)

module.exports = event