'use strict';

const base64 = require('base-64');
const UserModel = require('../Models/userModel');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }
  let authHeaders = req.headers.authorization.split(' ');
  if (authHeaders[0] !== 'Basic ') {
    next('Invalid Login Headers');
    return;
  };
  const [email, password] = await base64.decode.authHeaders[1].split(':');
  try {
    const validUser = await UserModel.authenticateBasic(email, password);
    req.token = UserModel.generatetoken(validUser);
    next();
  } catch (error) {
    next('Invalid Login');
  }
};