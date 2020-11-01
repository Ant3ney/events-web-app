require('dotenv').config();

module.exports = {
    DATABASE_URL: "mongodb+srv://Anthony2361:7*h!WUUebHAu3vz@event-app.1sdhm.mongodb.net/eventapp?retryWrites=true&w=majority", //"mongodb://localhost:27017/web-event-app", // my local mongodb://localhost:27017/web-event-app
    PORT: process.env.PORT,
    BASE_URL:'http://localhost:3005',
    EVENT_FILE_PATH:'uploads',
    MAP_API_KEY: process.env.GOOGLE_API_KEY,
    SECRET: 'events-app',
    JWT_EXPIRATION_MS: 300000
}
