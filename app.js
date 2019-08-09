const express  = require('express')
const db = require('./models/index')
const apiRouter = require('./routes/api')
const bodyParser = require('body-parser')
constant = require('./constant')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route file 
app.use('/api',apiRouter)

//run app
db.connectDb(constant.DATABASE_URL).then(async () => {
    app.listen(process.env.PORT, () =>{
            console.log(`🚀  App started on ${constant.PORT}!`)
        }
    )
});

