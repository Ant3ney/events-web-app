const request = require('request');
const constanst = require("../constant");
var googleMapsUtil = {
    getGeocode: (adress, callback) => {
        var formatedAdress = googleMapsUtil.formatAddress(adress);
        var requestURL = ('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCEDQ4-UNgDqmkhyMsKFXoCT01xIrgvVAA&address=' + formatedAdress)
        console.log(requestURL);
        request(requestURL, (err, res, body) => {
            if(err){
                console.log("Something went wrong in google api test");
                console.log(err.message);
                callback(err, null);
            }
            else{
                console.log("Google api response below");
                //console.log(res);
                //console.log(body);
                callback(err, {res: res, body: body});
            }
        });
    },
    formatAddress: (adress) => {
        while(adress.indexOf(" ") >= 0){
            adress = adress.replace(" ", "+");
        }
        return adress;
    }
}

module.exports = googleMapsUtil;