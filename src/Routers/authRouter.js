'use strict';

const express = require('express');
const router = express.Router();
const UserModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const basicAuth = require('../middlewares/basicAuth');

router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, repairRequests } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const userInfo = { firstName, lastName, email, password: hashPassword, role, repairRequests };
    const user = new UserModel(userInfo);
    const saveData = await user.save();
    const token = UserModel.generateToken(saveData);
    res.status(200).json({ token });
  } catch (error) {
    res.status(404).json({ message: 'Error signup user' });
  }
});

router.post('/signin', basicAuth, (req, res) => {
  try {
    res.json({ token: req.token })
  } catch (error) {
    throw new Error(error.message);
  }
});
module.exports = router;

