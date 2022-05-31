const { validationResult } = require("express-validator");
const Voucher = require("../models/vouchers");
const User = require("../models/users");
const { VOUCHER_OBJ } = require("../utils");
const didkit= require('../helpers/didkit-handler');
const config = require('config');

exports.getVoucher = async (req, res) => {
  try {

    const voucher = await Voucher.findById(req.params.id);

    res.status(200).json({ message: "Voucher data", success: true, voucher });

  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "No voucher found", success: true, data: [] });
  }
};

exports.generateQRCode = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);

    const did = await didkit.getDid(config.get('DEFAULT_JWK'));

    const url = `https://tezotopia.talao.co/${voucher.id}?issuer=${did}`

    res.status(200).json({ message: "QR Code URL", success: true, data: url });

  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "No voucher found", success: true, data: [] });
  }
};

exports.postVoucher = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { name, email, pseudo, commission, phone, blockchain, accountBlockchain, duration } = req.body;

  try {

    const user = await User.create({ name: parseInt((Math.random() * 1000).toString()) });

    VOUCHER_OBJ.credentialSubject.affiliate.name = name;
    VOUCHER_OBJ.credentialSubject.affiliate.pseudo = pseudo;
    VOUCHER_OBJ.credentialSubject.affiliate.email = email;
    VOUCHER_OBJ.credentialSubject.affiliate.phone = phone;
    VOUCHER_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation = commission;
    VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain = blockchain;
    VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchainAccount = accountBlockchain;
    VOUCHER_OBJ.credentialSubject.offers.duration = duration;

    const voucher = await Voucher.create({ user, voucher: VOUCHER_OBJ });

    res.status(200).json({ message: "Voucher created", success: true, data: voucher });

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};


exports.updateVoucher = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { name, email, pseudo, commission, phone, blockchain, accountBlockchain, duration } = req.body;

  try {

    try {
      await Voucher.findById(req.params.id);
    } catch (err) {
      res.status(400).json({ message: "No voucher found", success: true, data: [] });
    }

    VOUCHER_OBJ.credentialSubject.affiliate.name = name;
    VOUCHER_OBJ.credentialSubject.affiliate.pseudo = pseudo;
    VOUCHER_OBJ.credentialSubject.affiliate.email = email;
    VOUCHER_OBJ.credentialSubject.affiliate.phone = phone;
    VOUCHER_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation = commission;
    VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain = blockchain;
    VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchainAccount = accountBlockchain;
    VOUCHER_OBJ.credentialSubject.offers.duration = duration;

    await Voucher.updateOne({ _id: req.params.id }, { voucher: VOUCHER_OBJ });

    res.status(200).json({ message: "Voucher updated", success: true, data: [] });

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};
