const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: {
    type: String
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Users'
  },

  voucher: {
    type: mongoose.SchemaTypes.Mixed,
  },

  type: String,

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
