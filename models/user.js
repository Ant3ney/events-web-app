const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true,
  }
}, {timestamps: {createdAt: 'createdAt'}});

const User = mongoose.model('User', userSchema);

module.exports = User;