module.exports = function (app) {
  require('../controller/auth.controller');
  app.use('/user', (req, res, next) => {console.log("This far"); next();}, require('./user.route'));
  //app.use('/api', require('./api.route'));
  //app.use('/frontend', require('./frontend.route'));
}