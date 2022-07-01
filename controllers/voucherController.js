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

    const url = `${config.get('ISSUER_URL')}/issuer/${voucher.id}`

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

  const {
    name,
    email,
    pseudo,
    commission,
    phone,
    blockchain,
    blockchainAccount,
    duration,
    discount,
  } = req.body;

  try {

    const user = await User.create({ name: parseInt((Math.random() * 1000).toString()) });
    const blockchainAccountPrefix = 'tz1';
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    VOUCHER_OBJ.credentialSubject.affiliate.name = name ? name : VOUCHER_OBJ.credentialSubject.affiliate.name;
    VOUCHER_OBJ.credentialSubject.affiliate.pseudo = pseudo ? pseudo : VOUCHER_OBJ.credentialSubject.affiliate.pseudo;
    VOUCHER_OBJ.credentialSubject.affiliate.email = email ? email : VOUCHER_OBJ.credentialSubject.affiliate.email;
    VOUCHER_OBJ.credentialSubject.affiliate.phone = phone ? phone : VOUCHER_OBJ.credentialSubject.affiliate.phone;
    VOUCHER_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation = commission ? commission : VOUCHER_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation;
    VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain = blockchain ? blockchain :VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain;
    VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchainAccount = blockchainAccount ? blockchainAccount + randomString : blockchainAccountPrefix + randomString;
    VOUCHER_OBJ.credentialSubject.offers.duration = duration ? duration : VOUCHER_OBJ.credentialSubject.offers.duration;
    VOUCHER_OBJ.credentialSubject.offers.benefit.discount = discount ? discount : VOUCHER_OBJ.credentialSubject.offers.benefit.discount;

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

  const {
    name,
    email,
    pseudo,
    commission,
    phone,
    blockchain,
    blockchainAccount,
    duration,
    discount,
    blockchainTezos,
    expirationDate,
    issuanceDate,
    voucherId,
    subjectId,
  } = req.body;

  try {

    try {
      await Voucher.findById(req.params.id);
    } catch (err) {
      res.status(400).json({ message: "No voucher found", success: true, data: [] });
    }

    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    VOUCHER_OBJ.credentialSubject.affiliate.name = name ? name : VOUCHER_OBJ.credentialSubject.affiliate.name;
    VOUCHER_OBJ.credentialSubject.affiliate.pseudo = pseudo ? pseudo : VOUCHER_OBJ.credentialSubject.affiliate.pseudo;
    VOUCHER_OBJ.credentialSubject.affiliate.email = email ? email : VOUCHER_OBJ.credentialSubject.affiliate.email;
    VOUCHER_OBJ.credentialSubject.affiliate.phone = phone ? phone : VOUCHER_OBJ.credentialSubject.affiliate.phone;
    VOUCHER_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation = commission ? commission : VOUCHER_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation;
    VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain = blockchain ? blockchain :VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain;
    VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchainAccount = blockchainAccount ? blockchainAccount + randomString : VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchainAccount
    VOUCHER_OBJ.credentialSubject.offers.duration = duration ? duration : VOUCHER_OBJ.credentialSubject.offers.duration;
    VOUCHER_OBJ.credentialSubject.offers.benefit.discount = discount ? discount : VOUCHER_OBJ.credentialSubject.offers.benefit.discount;

    VOUCHER_OBJ.credentialSubject.id = subjectId ? subjectId : VOUCHER_OBJ.credentialSubject.id;
    VOUCHER_OBJ.id = voucherId ? voucherId : VOUCHER_OBJ.id;
    VOUCHER_OBJ.issuanceDate = issuanceDate ? issuanceDate : VOUCHER_OBJ.issuanceDate;
    VOUCHER_OBJ.expirationDate = expirationDate ? expirationDate : VOUCHER_OBJ.expirationDate;
    VOUCHER_OBJ.credentialSubject.associatedAddress.blockchainTezos = blockchainTezos ? blockchainTezos : VOUCHER_OBJ.credentialSubject.id;

    await Voucher.updateOne({ _id: req.params.id }, { voucher: VOUCHER_OBJ });

    res.status(200).json({ message: "Voucher updated", success: true, data: [] });

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};
