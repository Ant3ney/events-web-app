/*
    Api utilities
*/

var moment = require('moment');

var util = {
    formatDate: (dbDate) => {
        return (moment(dbDate).format('DD/MM/YYYY hh:mm:ss'));
    },
    formatEventAryDates: (events) => {
        var fDates = [];
        for(var i = 0; i < events.length; i++){
            fDates[i] = {};
            fDates[i].eventStartDate = util.formatDate(events[i].eventStartDate);
            fDates[i].eventEndDate = util.formatDate(events[i].eventEndDate);
        }
        
        return fDates;
    }
}

module.exports = util;