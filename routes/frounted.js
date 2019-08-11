const express = require('express');
const controller = require('../controller/frounted.controller')
const router = express.Router();
const { check } = require('express-validator');
const moment = require('moment');

router.get('/event/',controller.eventList)

module.exports = router;



