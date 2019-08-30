module.exports = {
    DATABASE_URL:"mongodb://localhost:27017/web-event-app", // my local mongodb://localhost:27017/web-event-app
    PORT:3005,
    BASE_URL:'http://localhost:3005',
    EVENT_FILE_PATH:'uploads',
    MAP_API_KEY: process.env.GOOGLE_API_KEY,
    SECRET: 'events-app',
    JWT_EXPIRATION_MS: 300000
}
