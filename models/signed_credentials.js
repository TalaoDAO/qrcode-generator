const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    signed_voucher: String,

    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('signed_credentials', schema);
