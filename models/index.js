const mongoose = require('mongoose');
const User = require('./user');

const connectDb = (URL) => {
  return mongoose.connect(URL,{ useNewUrlParser: true });
};

const models = { User };

module.exports = {models,connectDb}