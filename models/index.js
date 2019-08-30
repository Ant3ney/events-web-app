const mongoose = require('mongoose');

const connectDb = (URL) => {
  return mongoose.connect(URL,{ useNewUrlParser: true });
};

module.exports.connectDb = (URL) => {
  if (mongoose.connection.db == null) {
    return mongoose.connect(URL, { useNewUrlParser: true }).catch(function (ee) {});
  }
}