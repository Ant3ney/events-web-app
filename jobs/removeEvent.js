const eventModel = require('../models/event')

module.exports = function(agenda) {
    agenda.define('removeEvent',async function(job, done) {
        var event = await eventModel.find({
            '_id':job.attrs.data.id,
            'eventEndDate':job.attrs.data.eventEndDate
        })
        if(event.length > 0){
            event.status = 'completed'
            event.save()
        } 
        done()
    });
};