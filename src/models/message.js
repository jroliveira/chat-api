'use strict';

const
  mongoose = require('mongoose');

let messageSchema = mongoose.Schema({
  id: {
    type: String,
    trim: true,
    required: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  message: {
    type: String,
    trim: true,
    required: true
  },
  date: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);