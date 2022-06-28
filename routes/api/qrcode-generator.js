const router = require('express').Router();
const qrcodeController = require('../../controllers/qrcodeController');
const {body} = require("express-validator");
const authMiddleware = require('../../middleware/auth')
const multer = require('multer')

const upload = multer()

// @route   GET api/qrcode-generator/
// @desc    Get qr code
// @access  public
router.get('/', qrcodeController.getQRCode);

// @route   GET api/qrcode-generator/challenge
// @desc    Get response with random id
// @access  private
router.get('/:id', qrcodeController.getChallenge);

// @route   post api/qrcode-generator/
// @desc    Login random
// @access  private
router.post('/:id', qrcodeController.verify);

module.exports = router;
