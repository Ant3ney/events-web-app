const express  = require('express')
const db = require('./models/index')
const apiRouter = require('./routes/api')
const expressHbs = require('express-handlebars');
const frountedRouter = require('./routes/frounted')
const userRouter = require('./routes/user.route')
const auth = require('./controller/auth.controller');
const bodyParser = require('body-parser')
constant = require('./constant')
const path = require('path')
const hbs = require('hbs')
const logger = require('morgan');
const passport = require('passport');
require('./models/index').connectDb(constant.DATABASE_URL);
require('./passport');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerHelper('for', function(from, to, incr, block) {
    var accum = '';
    for(var i = from; i < to; i += incr)
        accum += block.fn(i);
    return accum;
});
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));

//route file
app.use('/api', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), apiRouter)
app.use('/frounted', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}, frountedRouter)
app.use('/user', userRouter);
app.use('/auth', auth);


app.set("views",path.join(__dirname,"views"))
app.set("view engine","hbs")

app.use(express.static('public'))
app.get('/', function (req, res) {
  res.redirect('/frounted/event');
});
app.get('/login', function (req, res) {
  res.render('login', {layout: false});
});
app.get('/register', function (req, res) {
  res.render('register', {layout: false});
});

//run app
app.listen(constant.PORT, () =>{
    console.log(`🚀  App started on ${constant.PORT}!`)
  }
)
const gulp = require('gulp');
const apidoc = require('gulp-api-doc');

gulp.task('doc', () => {
    return gulp.src('routes')
        .pipe(apidoc())
        .pipe(gulp.dest('documentation'));
});
gulp.task('doc', () => {
    return gulp.src(['routes/api.js'])
        .pipe(apidoc({markdown: false}))
        .pipe(gulp.dest('documentation'));
});
process.on('SIGINT', function() {
  // some other closing procedures go here
  process.exit(1);
});