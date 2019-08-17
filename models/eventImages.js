const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
    },
    originalname: {
        type: String
    },
    filename: {
        type: String
    },
    mimetype: {
        type: String
    },
    size: {
        type: String
    }
},{ timestamps: { createdAt: 'createdAt' }  })

const eventImages = mongoose.model('eventImages', eventSchema)

module.exports = eventImages