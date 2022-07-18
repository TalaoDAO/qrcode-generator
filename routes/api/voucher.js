const router = require('express').Router();
const voucherController = require('../../controllers/voucherController');

// @route   GET get/vouchers/:id
// @desc    Get voucher info
// @access  public
router.get('/:id', async (req, res) => {
  let qArr;
  if (req.params.id === 'voucher_mobile'){
    qArr = req.params.id
  } else {
    qArr = req.params.id.split('_');
    req.params.id = qArr[1];
  }

  if(qArr.length < 2) {
    return res.status(400).json({ message: "No found", success: true, data: [] });
  }

  return voucherController.getVoucher(req, res);
});

// @route   PUT get/vouchers/:id
// @desc    Update voucher info
// @access  public
router.put('/:id', async (req, res) => {
  let qArr;
  if (req.params.id === 'voucher_mobile'){
    qArr = req.params.id
  } else {
    qArr = req.params.id.split('_');
    req.params.id = qArr[1];
  }

  if(qArr.length < 2) {
    return res.status(400).json({ message: "No found", success: true, data: [] });
  }

  return voucherController.updateVoucher(req, res);
});

module.exports = router;
