const User = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const constant = require('../constant')
const hashCost = 10;

module.exports.createUser = async (req, res) => {
  let userData = req.body;
  try {
    let user = await User.findOne({name: userData.name});
    if (user) {
      res.status(409).json({
        message: 'User already exists'
      });
    }
    user = new User({name: userData.name});
    const passwordHash = await bcrypt.hash(userData.password, hashCost);
    user.passwordHash = passwordHash;
    await user.save();
    res.status(200).json({
      user: user
    });
  } catch (err) {
    res.status(400).json({
      message: 'Unable to create the user'
    });
  }
};

module.exports.updateUser = async (req, res) => {
  let userId = req.params.user_id;
  let userData = req.body;
  try {
    let user = await User.findOne({_id: userId});
    if (!user) {
      res.status(404).json({
        message: 'User not found'
      });
    }
    if (userData.password) {
      const passwordHash = await bcrypt.hash(userData.password, hashCost);
      user.passwordHash = passwordHash;
    }
    await user.save();
    res.status(200).json({
      user: user
    });

  } catch (err) {
    res.status(400).json({
      message: 'Unable to update the user'
    });
  }
};
