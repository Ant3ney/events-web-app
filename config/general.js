const constant = require("../constant");

module.exports = {
    fixOnExit: (process) => {
        process.on('SIGINT', () => {
            process.exit(1);
        });
    },
    getDbString: () => {
        if(process.env.LOCATION === "Heroku"){
            return process.env.MONGO_ATLAS_DBURL;
        }
        return constant.DATABASE_URL;
    }
}