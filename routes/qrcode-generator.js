const router = require('express').Router();
const qrcodeController = require('../controllers/qrcodeController');

// @route   GET get/qrcode-generator/
// @desc    Get qr code
// @access  public
router.get('/', qrcodeController.getQRCode);

// @route   GET get/qrcode-generator/:id
// @desc    Get response with random id
// @access  public
router.get('/:id', qrcodeController.getChallenge);

module.exports = router;
