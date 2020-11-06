const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,'name is required']
    },
    addressLine_1: {
        type: String,
        required:[true,'addressLine_1 is required']
    },
    addressLine_2: {
        type: String,
        default:''
    },
    region: {
        type: String,
        required:[true,'region is required']
    },
    city: {
        type: String,
        required:[true,'city is required']
    },
    postCode: {
        type: Number,
        required:[true,'postCode is required']
    },
    eventStartDate:{
        type: Date,
        required:[true,'eventStartDate is required']
    },
    eventEndDate:{
        type : Date,
        required:[true,'eventEndDate is required']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:[true,'User is required']
    },
    category: {
        type: String,
        required:[true,'Category is required']
    },
    visibility: {
        type: String,
        required:[true,'Visibility is required']
    },
    country: {
        type: String,
        required: [true, "Country is required"]
    },
    geocode: {
        lat: {
            type: String
        },
        long: {
            type: String
        }
    },
    notes:{
        type : String,
    },
    status:{
        type : String,
    },
    api_key:{
        type : String
    },
},{ timestamps: { createdAt: 'createdAt' }  })

const event = mongoose.model('Event', eventSchema)

module.exports = event
