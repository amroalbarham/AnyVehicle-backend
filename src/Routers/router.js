'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth');
const acl = require('../middlewares/aclMiddlewares');
const Interface = require('../InterFace/interFace');

router.get('/read', bearerAuth, acl('read'), async (req, res) => {
  const { email } = req.query;
  const userInfo = await Interface.readRequest(email);
  res.json(userInfo);
});

router.post('/create', bearerAuth, acl('create'), async (req, res) => {
  const { name, problemDomain, damageAmount, time, createdAt, selelctedFile, email } = req.body;

  try {
    const createRequestData = await Interface.createRequest({ name, problemDomain, damageAmount, time, createdAt, selelctedFile, email });
    res.json(createRequestData);
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.delete('/delete', bearerAuth, acl('delete'), async (req, res) => {
  const { email, name } = req.body;
  const deleteRequestData = await Interface.deleteRequest({ email, name });
  res.send(deleteRequestData);
});

router.put('/update', bearerAuth, acl('update'), async (req, res) => {
  const { email, name, status } = req.body;
  const updataRequestData = await Interface.updataRequest({ email, name, status });
  res.send(updataRequestData);
});

module.exports = router;
