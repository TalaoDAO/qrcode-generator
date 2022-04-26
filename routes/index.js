const router = require('express').Router();

router.use('/api/vouchers', require('./voucher'));
router.use('/api/qrcode-generator', require('./qrcode-generator'));

module.exports = router;
