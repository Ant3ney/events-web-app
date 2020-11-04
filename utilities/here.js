const request = require('request');
const constanst = require("../constant");
var hereUtil = {
    getGeocode: (adress) => {
        var formatedAdress = hereUtil.formatAddress(adress);
        var requestURL = ('https://geocode.search.hereapi.com/v1/geocode?q=' + formatedAdress + '&apiKey=FLdklV0S2TtSlb5XWAlclG6tn3Z8kaw7ipy7ObEEPrY');
        console.log("Formated addres = " + requestURL);
        return new Promise((resolve, reject) => {
            request(requestURL, (err, res, body) => {
                if(err){
                    console.log("Something went wrong in here api test");
                    console.log(err.message);
                    reject(err);
                }
                else{
                    if(!JSON.parse(body).items[0]){
                        reject({message: "JSON.parse(body).items[0] was undefined"});
                        return;
                    }
                    resolve(JSON.parse(body).items[0].position);
                }
            });
        });
    },
    formatAddress: (adress) => {
        //replace spaces with pluses
        while(adress.indexOf(" ") >= 0){
            adress = adress.replace(" ", "+");
        }
        //remove all #
        while(adress.indexOf("#") >= 0){
            adress = adress.replace("#", "");
        }
        return adress;
    }
}

module.exports = hereUtil;