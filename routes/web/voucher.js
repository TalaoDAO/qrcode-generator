const router = require('express').Router();
const voucherController = require('../../controllers/voucherController');
const { body, check } = require("express-validator");
const authMiddleware = require('../../middleware/auth')

// @route   GET get/vouchers/:id
// @desc    Get voucher info
// @access  public
router.get('/:id', authMiddleware, voucherController.getVoucher);

// @route   GET get/vouchers/:id/qr-code
// @desc    Generate QR Code for vouchers
// @access  public
router.get('/:id/qr-url', authMiddleware, voucherController.generateQRCode);

// @route   POST get/vouchers/
// @desc    Create a new user and a voucher
// @access  public
router.post('/', authMiddleware, [
  body('name', 'Name is required!').trim().not().isEmpty(),
  check('email', 'Email is required!').trim().isEmail(),
  body('pseudo').trim(),
  body('socialNetwork').trim(),
  body('phone').trim(),
], voucherController.postVoucher);

// @route   PUT get/vouchers/:id
// @desc    Update voucher info
// @access  public
router.put('/:id', authMiddleware, voucherController.updateVoucher);

module.exports = router;
