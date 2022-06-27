const router = require('express').Router();
const membershipCardController = require('../../controllers/membershipCardController');
const { body, check } = require("express-validator");

// @route   GET get/vouchers/:id
// @desc    Get voucher info
// @access  public
router.get('/:id', membershipCardController.getVoucher);

// @route   GET get/vouchers/:id/qr-code
// @desc    Generate QR Code for vouchers
// @access  public
router.get('/:id/qr-url', membershipCardController.generateQRCode);

// @route   POST get/vouchers/
// @desc    Create a new user and a voucher
// @access  public
router.post('/', [
    body('name', 'Name is required!').trim().not().isEmpty(),
    check('email', 'Email is required!').trim().isEmail(),
    body('pseudo').trim(),
    body('socialNetwork').trim(),
    body('phone').trim(),
], membershipCardController.postVoucher);

// @route   PUT get/vouchers/:id
// @desc    Update voucher info
// @access  public
router.put('/:id', membershipCardController.updateVoucher);

module.exports = router;
