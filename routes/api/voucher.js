const router = require('express').Router();
const voucherController = require('../../controllers/voucherController');
const { body, check } = require("express-validator");

// @route   GET get/vouchers/:id
// @desc    Get voucher info
// @access  public
router.get('/:id', voucherController.getVoucher);

// @route   GET get/vouchers/:id/qr-code
// @desc    Generate QR Code for vouchers
// @access  public
router.get('/:id/qr-url', voucherController.generateQRCode);

// @route   POST get/vouchers/
// @desc    Create a new user and a voucher
// @access  public
router.post('/', [
  body('name', 'Name is required!').trim().not().isEmpty(),
  check('email', 'Email is required!').trim().isEmail(),
  body('pseudo').trim(),
  body('socialNetwork').trim(),
  body('phone').trim(),
], voucherController.postVoucher);

// @route   PUT get/vouchers/:id
// @desc    Update voucher info
// @access  public
router.put('/:id', voucherController.updateVoucher);

module.exports = router;
