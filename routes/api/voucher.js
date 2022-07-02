const router = require('express').Router();
const voucherController = require('../../controllers/voucherController');
const membershipCardController = require('../../controllers/membershipCardController');
const Voucher = require("../../models/vouchers");

// @route   GET get/vouchers/:id
// @desc    Get voucher info
// @access  public
router.get('/:id', async (req, res) => {
  const qArr = req.params.id.split('_');
  req.params.id = qArr[1];

  if(qArr.length < 2) {
    return res.status(400).json({ message: "No found", success: true, data: [] });
  }

  if(qArr[0] == 'voucher') {
    return voucherController.getVoucher(req, res);
  } else {    return membershipCardController.getMembershipCard(req, res);
  }
});

// @route   PUT get/vouchers/:id
// @desc    Update voucher info
// @access  public
router.put('/:id', async (req, res) => {
  const qArr = req.params.id.split('_');

  if(qArr.length < 2) {
    return res.status(400).json({ message: "No found", success: true, data: [] });
  }

  req.params.id = qArr[1];

  if(qArr[0] == 'voucher') {
    return voucherController.updateVoucher(req, res);
  } else {
    return membershipCardController.updateMembershipCard(req, res);
  }
});

module.exports = router;
