const express  = require('express')
const db = require('./models/index')
const apiRouter = require('./routes/api')
const expressHbs = require('express-handlebars');
const frountedRouter = require('./routes/frounted')
const bodyParser = require('body-parser')
constant = require('./constant')
const path = require('path')
const hbs = require('hbs')

const app = express();

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
app.use('/api',apiRouter)
app.use('/frounted',frountedRouter)

app.set("views",path.join(__dirname,"views"))
app.set("view engine","hbs")

app.use(express.static('public'))

//run app
db.connectDb(constant.DATABASE_URL).then(async () => {
    app.listen(constant.PORT, () =>{
            console.log(`🚀  App started on ${constant.PORT}!`)
        }
    )
});

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