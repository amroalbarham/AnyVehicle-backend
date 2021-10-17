'use strict';

const UserModel = require('../Models/userModel');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('missing auth headers');
    return;
  };
  const headers = req.headers.authorization.split(' ');
  if (headers[0] !== 'Bearer') {
    next('invalid auth headers!');
    return;
  };
  try {
    const validUser = await UserModel.authenticateToken(headers[1]);
    req.user = validUser;
    next();
  } catch (error) {
    next(error.message);
  }
}