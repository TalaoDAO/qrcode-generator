const router = require('express').Router();
const qrcodeController = require('../controllers/qrcodeController');
const {body} = require("express-validator");
const authMiddleware = require('../middleware/auth')

// @route   GET api/qrcode-generator/
// @desc    Get qr code
// @access  public
router.get('/', qrcodeController.getQRCode);

// @route   GET api/qrcode-generator/challenge
// @desc    Get response with random id
// @access  private
router.get('/challenge', authMiddleware, qrcodeController.getChallenge);

// @route   post api/qrcode-generator/
// @desc    Login random
// @access  private
router.post('/', [authMiddleware, [
    body('presentation', 'Presentation is required!').trim().not().isEmpty(), // String json
]], qrcodeController.verify);

module.exports = router;
