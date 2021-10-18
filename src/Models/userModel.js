'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const maintenanceShema = require('./maintenanceModel.js');
const SECRET = process.env.SECRET;

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['admin', 'user'], required: true },
  repairRequests: [maintenanceShema],
},
  {
    toJSON: { virtuals: true },
  });


userSchema.virtual('capabilities').get(function () {
  const acl = {
    admin: ['read', 'delete', 'update'],
    user: ['read', 'delete', 'create'],
  };
  return acl[this.role];
});

userSchema.statics.authenticateBasic = async function (email, password) {
  const user = await this.findOne({ email });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) { return user };
  throw new Error('Invalid Login');
};

userSchema.statics.generateToken = function (user) {
  let userToken = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    capabilities: user.capabilities,
  };
  
  return jwt.sign(userToken, SECRET);
};

userSchema.statics.authenticateToken  = async function (token) {
  try {
    const data = jwt.verify(token, SECRET);
    const user = await this.findOne({ email: data.email });
    if (user) return user;
    throw new Error('USER NOT FOUND');
  } catch (error) {
    throw new Error(error.message);
  }
};
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
