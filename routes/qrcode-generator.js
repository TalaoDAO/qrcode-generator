const router = require('express').Router();
const qrcodeController = require('../controllers/qrcodeController');

// @route   GET get/qrcode-generator/
// @desc    Get qr code
// @access  public
router.get('/', qrcodeController.getQRCode);

module.exports = router;
