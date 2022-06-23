const router = require('express').Router();

router.use('/api/vouchers', require('./api/voucher'));
router.use('/qrcode-generator', require('./web/qrcode-generator'));
router.use('/vouchers', require('./web/voucher'));

module.exports = router;
