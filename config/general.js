const constant = require("../constant");
const corsCheck = require("./getCORSOrgin");

module.exports = {
    fixOnExit: (process) => {
        process.on('SIGINT', () => {
            process.exit(1);
        });
    },
    configureCorsOrginAcess: (app) => {
        app.use((req, res, next) => {
            var host = req.headers.origin || req.headers.host;
            var orgin = corsCheck(host);
            
            res.setHeader('Access-Control-Allow-Origin', orgin);
	        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            console.log("Host: " + host);
            console.log("Orgin: " + orgin);
	        next();
        });
    },
    getDbString: () => {
        if(process.env.LOCATION == "Heroku"){
            return process.env.MONGO_ATLAS_DBURL;
        }
        return constant.DATABASE_URL;
    }
}