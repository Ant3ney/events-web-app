const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');
const passport = require('passport');
router.post('/create', UserController.createUser);
router.put('/update/:user_id', passport.authenticate('jwt', {session: false}), UserController.updateUser);

module.exports = router;
