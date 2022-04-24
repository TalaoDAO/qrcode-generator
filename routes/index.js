const router = require('express').Router();

router.use('/api/vouchers', require('./voucher'));

module.exports = router;
