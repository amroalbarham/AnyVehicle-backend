'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URL = process.env.MONGODB_URL;
const router = require('./src/Routers/router');
const authRouter = require('./src/Routers/authRouter');

app.use(cors());
app.use(express.json());
app.use('/', router);
app.use('/register', authRouter);


mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`server connect on PORT ${PORT}`)))
  .catch((e) => console.error('Connection error', e.nessage));




