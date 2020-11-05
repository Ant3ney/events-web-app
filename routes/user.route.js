const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');
const authController = require("../controller/auth.controller");
router.post('/create', UserController.createUser);
router.post("/signIn", authController.signIn);
router.post("/signOut", authController.signOut);
router.put('/update/:user_id', UserController.updateUser);
router.get("/reValidateKey", UserController.reValidateKey);
router.get("/isValid", UserController.isValid);

module.exports = router;