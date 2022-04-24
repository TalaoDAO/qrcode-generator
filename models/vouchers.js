const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Users'
  },

  voucher: {
    type: mongoose.SchemaTypes.Mixed,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Vouchers', schema);
