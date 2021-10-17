'use strict';

const mongoose = require('mongoose');


const maintenanceShema = mongoose.Schema({
  name: { tyep: String, required: true },
  problemDomain: { type: String, required: true },
  damageAmount: { type: String, required: true },
  time: { type: String, required: true, default: 'normal', enum: ['urgent', 'normal'] },
  status: { type: String, required: true, default: 'pending' },
  createdAt: { type: Date, default: new Date() },
  selelctedFile: { type: String, required: true },
  id: { type: String, required: true },
});

const maintenanceModel = mongoose.model('maintenance', maintenanceShema);

module.exports = maintenanceShema;