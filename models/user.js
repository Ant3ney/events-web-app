const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
},{ timestamps: { createdAt: 'createdAt' }  });


const user = mongoose.model('User', userSchema);

module.exports = user;