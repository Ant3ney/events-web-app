const express = require('express');
const router = express.Router();
var User = require("../models/user");
var Event = require("../models/event");
var hereUtil = require("../utilities/here");
var authUtil = require("../utilities/authentication");

router.get("/testTestGetLoggedInUser", (req, res) => {
    authUtil.getUserFromJwt(req).then((user) => {
        console.log("route user below");
        console.log(user);
        res.json(user);
    }).catch((err) => {
        res.json(err);
    });
});

router.get("/testGeocode", (req, res) => {
    hereUtil.getGeocode("3528 emerald st apt#09 torrance ca", (err, data) => {
        if(err){
            res.json(err);
        }
        else{
            res.json(data);
        }
    });
});

router.get("/deleteUsers", (req, res, next) => {
    //Remove all users
    User.remove({}, (err) => {
	    if(err){
	    	console.log("Something went wrong");
            console.log(err.message);
            res.send(err.message);
	    }
	    else{
	    	console.log("all users have been deleted");
	    	User.find({}, (err, users) => {
                console.log(users);
                res.send("Deleated all users");
	    	});
	    }
    });
});

router.get("/listUsers", (req, res, next) => {
    User.find({}, (err, users) => {
        if(err){
	    	console.log("Something went wrong");
            console.log(err.message);
            res.send(err.message);
	    }
	    else{
            console.log(users);
            res.json(users);
        }
    });
});

router.get("/listEvents", (req, res) => {
    Event.find({}, (err, events) => {
        if(err){
	    	console.log("Something went wrong");
            console.log(err.message);
            res.send(err.message);
        }
        else{
            console.log(events);
            res.send(events);
        }
    });
});

router.get("/seedAdminData", async (req, res) => {
    var adminAry = [
        {
            name: "Aaron",
            password: "1234password",
            userType: "superadmin"
        },
        {
            name: "Anthony",
            password: "1234password",
            userType: "superadmin"
        },
        {
            name: "Pablo",
            password: "1234password",
            userType: "admin"
        }
    ]
    adminAry.forEach(async (admin) => {
        if(await User.findOne({name: admin.name})){
            console.log(admin.name + " is alread in the databace");
            return;
        }
        var newAdmin = await User.create(admin);
        console.log(newAdmin);
    });
    res.send("seeded admin data");
});

module.exports = router;