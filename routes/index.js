module.exports = function (app, passport, LocalStrategy, JwtStrategy) {
  require('../controller/auth.controller')(app, passport, LocalStrategy, JwtStrategy);
  app.use('/user', require('./user.route'));
  //app.use('/api', require('./api.route'));
  //app.use('/frounted', require('./frounted.route'));
}