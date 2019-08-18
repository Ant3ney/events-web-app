const express = require('express');
const controller = require('../controller/api.controller')
const router = express.Router();
const { check } = require('express-validator');
const moment = require('moment');
const eventModel = require('./../models/event')

const auth = function(req, res, next) {

    //get the token from the header if present
    const token = req.headers.token;
    //if no token found, return response (without going to the next middelware)
    const api_keys = [
        "1f666199-f09a-48ca-b96d-3b96763fd2d7"
    ]
    if (!token && api_keys.findIndex(item => item === token) == -1) {
        return res.status(401).json({
            message: 'unAuthorized'
        });
    }
    req.user = {}
    req.user.auth_key = token;
    next();

}
router.use(auth)
    // list event

/**
 * @api {get} /events List all Event
 * @apiGroup Event
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
    "event": [
        {
            "_id": "5d4decb94f13403560a55baa",
            "name": "kingss",
            "addressLine_1": "sahsahs",
            "addressLine_2": "",
            "region": "sahvshas",
            "city": "ahsvha",
            "postCode": "asvash",
            "eventStartDate": "asacgsc",
            "eventEndDate": "asvahsvah",
            "notes": "savhsavsha",
            "status": "Pending"
        },
        {
            "_id": "5d4dedb38dd532374ef40202",
            "name": "kingss",
            "addressLine_1": "sahsahs",
            "addressLine_2": "",
            "region": "sahvshas",
            "city": "ahsvha",
            "postCode": "asvash",
            "eventStartDate": "asacgsc",
            "eventEndDate": "asvahsvah",
            "notes": "savhsavsha",
            "status": "Pending"
        }
    ]
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/event', controller.event.get)


/**
 * @api {post} /event Create event
 * @apiGroup Event
 * @apiParam {name} name
 * @apiParam {addressLine_1} addressLine_1
 * @apiParam {addressLine_2} addressLine_2 this is optional field
 * @apiParam {region} region
 * @apiParam {city} city 
 * @apiParam {postCode} postCode
 * @apiParam {eventStartDate} eventStartDate
 * @apiParam {eventEndDate} eventEndDate 
 * @apiParam {notes} notes this is optional field
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
    "event": {
        "_id": "5d4dee79beb4c738d2de6184",
        "name": "kingss",
        "addressLine_1": "sahsahs",
        "addressLine_2": "",
        "region": "sahvshas",
        "city": "ahsvha",
        "postCode": "asvash",
        "eventStartDate": "asacgsc",
        "eventEndDate": "asvahsvah",
        "notes": "savhsavsha",
        "status": "Pending"
    }
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/event', [
    //validation
    check('name').exists().withMessage('name is required field'),
    check('addressLine_1').exists().withMessage('addressLine_1 is required field'),
    check('region').exists().withMessage('region is required field'),
    check('city').exists().withMessage('city is required field'),
    check('postCode').exists().withMessage('postCode is required field'),
    check('eventStartDate')
    .exists()
    .withMessage('eventStartDate is required field')
    .custom(function(value, { req, res }) {
        var pattern = new RegExp("^(3[01]|[12][0-9]|0[1-9])/(1[0-2]|0[1-9])/[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$");
        if (value.search(pattern) === 0) {
            return true;
        }
        return Promise.reject('eventStartDate must be in correct format dd/mm/yyyy hh:mm:ss')
    }),
    check('eventEndDate').exists().withMessage('eventEndDate is required field')
    .custom(function(value, { req, res }) {
        var pattern = new RegExp("^(3[01]|[12][0-9]|0[1-9])/(1[0-2]|0[1-9])/[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$");
        if (value.search(pattern) === 0) {
            return true
        } 
        return Promise.reject('eventEndDate must be in correct format dd/mm/yyyy hh:mm:ss')
    }),
], controller.event.insert)

/**
 * @api {put} /event/:id update a event
 * @apiGroup Event
 * @apiParam {name} name
 * @apiParam {addressLine_1} addressLine_1
  * @apiParam {addressLine_2} addressLine_2 
 * @apiParam {region} region
 * @apiParam {city} city
 * @apiParam {postCode} postCode
 * @apiParam {eventStartDate} eventStartDate
 * @apiParam {eventEndDate} eventEndDate
 * @apiParam {notes} notes 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 {
    "event": {
        "_id": "5d4dee79beb4c738d2de6184",
        "name": "kingss",
        "addressLine_1": "sahsahs",
        "addressLine_2": "",
        "region": "sahvshas",
        "city": "ahsvha",
        "postCode": "asvash",
        "eventStartDate": "asacgsc",
        "eventEndDate": "asvahsvah",
        "notes": "savhsavsha",
        "status": "Pending"
    }
}
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/event/:id', controller.event.update)


/**
 * @api {delete} /event/:id Remove a event
 * @apiGroup Event
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 
     {
        "message": "success"
      }
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/event/:id', controller.event.delete)

var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })
/**
 * @api {post} /event/images Add Images to Event
 * @apiGroup Event
 * @apiParam {image} form-data add single file object
 * @apiParam {eventId} event id  
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 
     {
        imageId:"5d54a649b2976426a30ce964s",
        imagePath:"image url"
    }
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/event/images', [
                upload.single('image'),
                check('eventId').exists().withMessage('EventId is Required Field').custom(async function(value){
                    try {
                        var data = await eventModel.findById(value);
                        if (data.length == 0) {
                            // not found error
                            return Promise.reject('eventId is invalid')
                        }
                    } catch (error) {
                        return Promise.reject('eventId is invalid')
                    }
                    return true;
                }),
            ],controller.event.addImage)
/**
 * @api {delete} /event/images remove Images to Event
 * @apiGroup Event
 * @apiParam {imageId} imageId for uniq image
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 
     {
        message:"success"
    }
 */
router.delete('/event/images', [check('imageId').exists().withMessage('imageId is Required Field').custom(async function(value){
    try {
        var data = await eventModel.findById(value);
        if (data.length == 0) {
            // not found error
            return Promise.reject('imageId is invalid')
        }
    } catch (error) {
        return Promise.reject('imageId is invalid')
    }
    return true;
})],controller.event.removeImage)
/**
 * @api {get} /event/images get Images to Event
 * @apiGroup Event
 * @apiParam {eventId} eventid
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 
     [{
        imageId:"5d54a649b2976426a30ce964s",
        imagePath:"image url"
    },{
        imageId:"5d54a649b2976426a30ce964s",
        imagePath:"image url"
    }]
 */
router.get('/event/images', [check('eventId').exists().withMessage('eventId is Required Field').custom(async function(value){
    try {
        var data = await eventModel.findById(value);
        if (data.length == 0) {
            // not found error
            return Promise.reject('eventId is invalid')
        }
    } catch (error) {
        return Promise.reject('eventId is invalid')
    }
    return true;
})],controller.event.getAllImages)

module.exports = router;