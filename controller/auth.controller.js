const User = require('../models/user');
const express = require('express');
const router  = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require('passport');
const constant = require('../constant')

router.post('/login', function (req, res, next) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log(err);
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user   : user
      });
    }
    const payload = {
      username: user.name,
      expires: Date.now() + constant.JWT_EXPIRATION_MS,
    };

    req.login(payload, {session: false}, (err) => {
      if (err) {
        res.status(400).json({ error });
      }

      const token = jwt.sign(JSON.stringify(payload), constant.SECRET);
      res.cookie('jwt', jwt, { httpOnly: true, secure: true });
      user = user.toObject();
      user.auth_key = token;
      res.redirect('/');
    });
  })
  (req, res);

});

module.exports = router;
