const router = require('express').Router();
const voucherController = require('../../controllers/voucherController');
const membershipCardController = require('../../controllers/membershipCardController');
const Voucher = require("../../models/vouchers");
const MembershipCard = require("../models/membershipCards");

// @route   GET get/vouchers/:id
// @desc    Get voucher info
// @access  public
router.get('/:id', async (req, res) => {
  const voucher = await Voucher.findById(req.params.id);
  if(voucher) {
    return voucherController.getVoucher(req, res);
  } else {
    return membershipCardController.getMembershipCard(req, res);
  }
});

// @route   PUT get/vouchers/:id
// @desc    Update voucher info
// @access  public
router.put('/:id', async (req, res) => {
  const voucher = await Voucher.findById(req.params.id);
  if(voucher) {
    return voucherController.updateVoucher(req, res);
  } else {
    return membershipCardController.updateMembershipCard(req, res);
  }
});

module.exports = router;
