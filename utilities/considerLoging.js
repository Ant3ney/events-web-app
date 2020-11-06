function considerLoging(msg, settings){
    if(process.env.DEBUG || (settings && settings.debug)){
        console.log(msg);
    }
}

module.exports = considerLoging;