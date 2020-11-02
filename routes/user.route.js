const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');
const authController = require("../controller/auth.controller");
const passport = require('passport');
router.post('/create', UserController.createUser);
router.post("/login", authController);
router.put('/update/:user_id', UserController.updateUser);
router.get("/reValidateKey", UserController.reValidateKey);
router.get("/isValid", UserController.isValid);

module.exports = router;