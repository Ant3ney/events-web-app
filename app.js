const express  = require('express')
const db = require('./models/index')
const apiRouter = require('./routes/api')
const bodyParser = require('body-parser')
constant = require('./constant')
const path = require('path')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route file 
app.use('/api',apiRouter)

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

