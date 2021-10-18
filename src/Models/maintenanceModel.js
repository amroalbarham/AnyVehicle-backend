'use strict';

const mongoose = require('mongoose');


const maintenanceShema = mongoose.Schema({
  name: { tyep: String },
  damageAmount: { type: String },
  time: { type: String, default: 'normal', enum: ['urgent', 'normal'] },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: new Date() },
  selelctedFile: { type: String },
  id: { type: String },
});

const maintenanceModel = mongoose.model('maintenance', maintenanceShema);

module.exports = maintenanceShema;