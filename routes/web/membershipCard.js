const router = require('express').Router();
const membershipCardController = require('../../controllers/membershipCardController');
const { body, check } = require("express-validator");
const authMiddleware = require('../../middleware/auth')

// @route   GET api/membership-cards/:id
// @desc    Get voucher info
// @access  public
router.get('/:id', authMiddleware, membershipCardController.getMembershipCard);

// @route   GET get/vouchers/:id/qr-code
// @desc    Generate QR Code for vouchers
// @access  public
router.get('/:id/qr-url', authMiddleware, membershipCardController.generateQRCode);

// @route   POST api/membership-cards/
// @desc    Create a new user and a voucher
// @access  public
router.post('/', authMiddleware, [
    body('duration', 'Membership card duration is required!').trim().not().isEmpty(),
    check('value', 'Membership card price is required!').trim().not().isEmpty(),
    check('currency', 'Membership card currency is required!').trim().not().isEmpty(),
  ], membershipCardController.postMembershipCard);


// @route   PUT api/membership-cards/:id
// @desc    Update voucher info
// @access  public
router.put('/:id', authMiddleware, membershipCardController.updateMembershipCard);
module.exports = router;
