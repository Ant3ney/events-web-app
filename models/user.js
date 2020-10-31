const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String
  },
  userType: {
    type: String,
    required: true
  },
  jwtApiKey: {
    type: String
  }
},
{ 
  timestamps: { 
    createdAt: 'createdAt' 
  }  
});


const user = mongoose.model('User', userSchema);

module.exports = user;