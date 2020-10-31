const express = require('express');
const controller = require('../controller/frontend.controller')
const router = express.Router();
const { check } = require('express-validator');
const moment = require('moment');

router.get('/event/', controller.eventList);
router.get('/event/details/events/:id', controller.eventDetails);

module.exports = router;