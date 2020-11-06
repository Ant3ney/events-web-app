const authUtil = require('./authentication');

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
    },
    pairEventsAndUser: (events, req) => {
        return new Promise((resolve, reject) => {
            authUtil.getUserFromJwt(req)
            .then((user) => {
                var dbInfo = {};
                dbInfo.events = events;
                dbInfo.user = user;
                resolve(dbInfo);
            })
            .catch((err) => {
                reject({
                    custumMsg: 'an error ocured in pair events and users having to do with geting user from jwt', 
                    message: err.message,
                    err: err
                });
            });
        });
    }
}

module.exports = util;