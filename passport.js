const User = require('./models/user');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
  }, async (name, password, done) => {
    try {
      const userDocument = await User.findOne({name: name})
      if (!userDocument) {
        return done('Incorrect Username / Password');
      }
      const passwordsMatch = await bcrypt.compare(password, userDocument.passwordHash);
      if (passwordsMatch) {
        return done(null, userDocument);
      } else {
        return done('Incorrect Username / Password');
      }
    } catch (error) {
      done(error);
    }
  }
));
var TokenExtractor = function(req){
  var token = null;

  if ((req.headers && req.headers.authorization) || (req.query && req.query.authorization)) {
    if (req.headers.authorization)
      var parts = req.headers.authorization.split(' ');
    else if (req.query.authorization)
      var parts = req.query.authorization.split(' ');

    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) { //<-- replace MyBearer by your own.
        token = credentials;
      }
    }
  } else if (req.param('token')) {
    token = req.param('token');
    delete req.query.token;
  } else if (req.cookies['token']) {
    token = req.cookies['token'];
  }

  return token;
}

passport.use(new JWTStrategy({
    jwtFromRequest: TokenExtractor,
    secretOrKey: constant.SECRET
  },
  (jwtPayload, done) => {
    return done(null, jwtPayload);
  }
));
