const express  = require('express')
const db = require('./models/index')
const apiRouter = require('./routes/api');
const expressHbs = require('express-handlebars');
const frontendRouter = require('./routes/frontend');
const userRouter = require("./routes/user.route");
const testRouter = require("./routes/testing");
const bodyParser = require('body-parser');
constant = require('./constant');
const path = require('path');
const hbs = require('hbs');
const config = require("./config/general");
const passport = require("passport");
const passportCofig = require("./config/passport");
const User = require("./models/user");
var cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
passport.initialize()
app.use(passport.initialize())

config.fixOnExit(process);
hbs.registerHelper('for', function(from, to, incr, block) {
    var accum = '';
    for(var i = from; i < to; i += incr)
        accum += block.fn(i);
    return accum;
});
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));

//route file
app.use('/api', apiRouter);
app.use("/user", userRouter);
app.use('/frontend',frontendRouter);
app.use(testRouter);
app.get("/", (req, res) => {res.send("In index")});

app.set("views",path.join(__dirname,"views"));
app.set("view engine","hbs");

app.use(express.static('public'));

//run app
db.connectDb(process.env.MONGO_ATLAS_DBURL)
app.listen(process.env.PORT, () =>{
    console.log(`App started on ${constant.PORT}!`);
    console.log("The url = " + config.getDbString());
});

const gulp = require('gulp');
const apidoc = require('gulp-apidoc');

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
