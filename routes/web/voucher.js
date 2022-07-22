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
router.get('/:id/qr-url/:type', authMiddleware, voucherController.generateQRCode);

// @route   POST get/vouchers/
// @desc    Create a new user and a voucher
// @access  public
router.post('/', authMiddleware, [
  body('type', 'Type is required!').trim().not().isEmpty(),
], voucherController.postVoucher);

// @route   POST get/vouchers/credentials
// @desc    Save signed voucher
// @access  public
router.post('/credentials', authMiddleware, [
  body('signed_voucher', 'Signed Voucher is required!').trim().not().isEmpty(),
], voucherController.postCredentials);

// @route   GET get/vouchers/
// @desc    Create a new user and a voucher
// @access  public
router.get('/', authMiddleware,  voucherController.getVouchers);

// @route   PUT get/vouchers/:id
// @desc    Update voucher info
// @access  public
router.put('/:id', authMiddleware, [
  body('type', 'Type is required!').trim().not().isEmpty(),
], voucherController.updateVoucher);

// @route   DELETE get/vouchers/:id
// @desc    Delete voucher
// @access  public
router.delete('/:id', authMiddleware, voucherController.deleteVoucher);

module.exports = router;
