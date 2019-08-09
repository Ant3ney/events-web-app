const express = require('express');
const controller = require('../controller/api.controller')
const router = express.Router();
const { check } = require('express-validator');
const moment = require('moment');

const auth = function (req, res, next) {

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
router.get('/event',controller.event.get)


/**
 * @api {post} /event Create event
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
router.post('/event',[
        //validation
        check('name').exists().withMessage('name is required field'),
        check('addressLine_1').exists().withMessage('addressLine_1 is required field'),
        check('region').exists().withMessage('region is required field'),
        check('city').exists().withMessage('city is required field'),
        check('postCode').exists().withMessage('postCode is required field'),
        check('eventStartDate').exists().withMessage('eventStartDate is required field'),
        check('eventEndDate').exists().withMessage('eventEndDate is required field'),
        check('notes').exists().withMessage('notes is required field'),
    ],controller.event.insert)

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
router.put('/event/:id',controller.event.update)


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
router.delete('/event/:id',controller.event.delete)

module.exports = router;



