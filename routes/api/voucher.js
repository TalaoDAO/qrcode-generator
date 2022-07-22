const router = require('express').Router();
const voucherController = require('../../controllers/voucherController');
const {VOUCHER_MOBILE_KEY, ARAGO_KEY} = require("../../utils");

// @route   GET get/vouchers/:id
// @desc    Get voucher info
// @access  public
router.get('/:id', async (req, res) => {
  if(req.params.id.length < 2) {
    return res.status(400).json({ message: "No found", success: true, data: [] });
  }

  if (req.params.id === VOUCHER_MOBILE_KEY) {
    req.params.id = VOUCHER_MOBILE_KEY;
    req.params.type = VOUCHER_MOBILE_KEY;
  } else if (req.params.id === ARAGO_KEY) {
    req.params.id = ARAGO_KEY;
    req.params.type = ARAGO_KEY;
  } else {
    let qArr = req.params.id.split('_');
    req.params.id = qArr[1];
    req.params.type = qArr[0];
  }

  return voucherController.getVoucher(req, res);
});

// @route   PUT get/vouchers/:id
// @desc    Update voucher info
// @access  public
router.put('/:id', async (req, res) => {
  if(req.params.id.length < 2) {
    return res.status(400).json({ message: "No found", success: true, data: [] });
  }

  if (req.params.id === VOUCHER_MOBILE_KEY) {
    req.params.id = VOUCHER_MOBILE_KEY;
    req.params.type = VOUCHER_MOBILE_KEY;
  } else if (req.params.id === ARAGO_KEY) {
    req.params.id = ARAGO_KEY;
    req.params.type = ARAGO_KEY;
  } else {
    let qArr = req.params.id.split('_');
    req.params.id = qArr[1];
    req.params.type = qArr[0];
  }

  return voucherController.updateVoucher(req, res);
});

module.exports = router;
