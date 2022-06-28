const router = require('express').Router();

router.use('/api/vouchers', require('./api/voucher'));
router.use('/api/qrcode-generator', require('./web/qrcode-generator'));
router.use('/qrcode-generator', require('./web/qrcode-generator'));
router.use('/vouchers', require('./web/voucher'));
router.use('/membership-cards', require('./web/membershipCard'));

module.exports = router;
