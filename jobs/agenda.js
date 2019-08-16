const Agenda = require('agenda');
var constant = require('./../constant')

const mongoConnectionString = constant.DATABASE_URL;

// or override the default collection name:
let agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobs'},timezone:'Asia/Kolkata'});

let jobTypes = ['removeEvent'];

jobTypes.forEach(function(type) {
    require('./'+type)(agenda);
});

agenda.on('start', job => {
    console.log('Job %s starting', job.attrs.name);
});

if(jobTypes.length) {
    agenda.on('ready', function() {
        agenda.start();
    });
}

function graceful() {
    agenda.stop(function() {
        process.exit(0);
    });
}

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

module.exports = agenda;