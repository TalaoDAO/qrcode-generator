const router = require('express').Router();
const qrcodeController = require('../controllers/qrcodeController');
const {body, check} = require("express-validator");

// @route   GET api/qrcode-generator/
// @desc    Get qr code
// @access  public
router.get('/', qrcodeController.getQRCode);

// @route   GET api/qrcode-generator/:id
// @desc    Get response with random id
// @access  public
router.get('/:id', qrcodeController.getChallenge);

// @route   post api/qrcode-generator/:id
// @desc    Login random
// @access  public
router.post('/:id',[
    body('presentation', 'Presentation is required!').trim().not().isEmpty(), // String json
], qrcodeController.verify);

module.exports = router;
