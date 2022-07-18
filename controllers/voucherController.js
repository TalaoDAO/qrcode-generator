const { validationResult } = require("express-validator");
const Voucher = require("../models/vouchers");
const User = require("../models/users");
const { VOUCHER_OBJ, VOUCHER_KEY, MEMBERSHIP_CARD_OBJ, MEMBERSHIP_KEY, VOUCHER_MOBILE_KEY} = require("../utils");
const didkit= require('../helpers/didkit-handler');
const config = require('config');
const mongoose = require("mongoose");

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

    const url = `${config.get('ISSUER_URL')}/issuer/${req.params.type}_${voucher.id}`

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
    value,
    currency,
    type,
    isMobile
  } = req.body;

  try {

    const user = await User.create({ name: parseInt((Math.random() * 1000).toString()) });
    const blockchainAccountPrefix = 'tz1';
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    let voucher;

    if (type === VOUCHER_KEY) {
      VOUCHER_OBJ.credentialSubject.affiliate.name = name ? name : VOUCHER_OBJ.credentialSubject.affiliate.name;
      VOUCHER_OBJ.credentialSubject.affiliate.pseudo = pseudo ? pseudo : VOUCHER_OBJ.credentialSubject.affiliate.pseudo;
      VOUCHER_OBJ.credentialSubject.affiliate.email = email ? email : VOUCHER_OBJ.credentialSubject.affiliate.email;
      VOUCHER_OBJ.credentialSubject.affiliate.phone = phone ? phone : VOUCHER_OBJ.credentialSubject.affiliate.phone;
      VOUCHER_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation = commission ? commission : VOUCHER_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation;
      VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain = blockchain ? blockchain :VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain;
      VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchainAccount = blockchainAccount ? blockchainAccount + '_' + randomString : blockchainAccountPrefix + '_' + randomString;
      VOUCHER_OBJ.credentialSubject.offers[0].duration = duration ? duration : VOUCHER_OBJ.credentialSubject.offers[0].duration;
      VOUCHER_OBJ.credentialSubject.offers[0].benefit.discount = discount ? discount : VOUCHER_OBJ.credentialSubject.offers[0].benefit.discount;

      if (isMobile) {
        const existingVoucher = await Voucher.findById('voucher_mobile')
        if (existingVoucher) {
          await Voucher.updateOne({ _id: 'voucher_mobile' }, { voucher: VOUCHER_OBJ });
        } else {
          voucher = await Voucher.create({ _id: 'voucher_mobile', user, voucher: VOUCHER_OBJ, type });
        }
      } else {
        voucher = await Voucher.create({ _id: new mongoose.Types.ObjectId(), user, voucher: VOUCHER_OBJ, type });
      }

      return res.status(200).json({ message: "Voucher created", success: true, data: voucher });

    } else if (type === MEMBERSHIP_KEY) {
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].duration = duration ? duration : MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].duration;
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].cardPrice.currency = currency ? currency : MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].cardPrice.currency;
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].cardPrice.value = value ? value : MEMBERSHIP_CARD_OBJ.credentialSubject.offers.cardPrice[0].value;
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].benefit.discount = discount ? discount : MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].benefit.discount;

      voucher = await Voucher.create({ _id: new mongoose.Types.ObjectId(), user, voucher: MEMBERSHIP_CARD_OBJ, type });

      return res.status(200).json({ message: "Membership card created", success: true, data: voucher });
    }

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

exports.getVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.status(200).json({ message: "Vouchers", success: true, data: vouchers });
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
    currency,
    value,
    type,
  } = req.body;

  try {

    try {
      await Voucher.findById(req.params.id);
    } catch (err) {
      res.status(400).json({ message: "No voucher found", success: true, data: [] });
    }

    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const voucherType =  type ? type : req.params.type;
    if (voucherType === VOUCHER_KEY || voucherType === VOUCHER_MOBILE_KEY) {
      VOUCHER_OBJ.credentialSubject.affiliate.name = name ? name : VOUCHER_OBJ.credentialSubject.affiliate.name;
      VOUCHER_OBJ.credentialSubject.affiliate.pseudo = pseudo ? pseudo : VOUCHER_OBJ.credentialSubject.affiliate.pseudo;
      VOUCHER_OBJ.credentialSubject.affiliate.email = email ? email : VOUCHER_OBJ.credentialSubject.affiliate.email;
      VOUCHER_OBJ.credentialSubject.affiliate.phone = phone ? phone : VOUCHER_OBJ.credentialSubject.affiliate.phone;
      VOUCHER_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation = commission ? commission : VOUCHER_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation;
      VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain = blockchain ? blockchain :VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain;
      VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchainAccount = blockchainAccount ? blockchainAccount + '_' + randomString : VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchainAccount
      VOUCHER_OBJ.credentialSubject.offers[0].duration = duration ? duration : VOUCHER_OBJ.credentialSubject.offers[0].duration;
      VOUCHER_OBJ.credentialSubject.offers[0].benefit.discount = discount ? discount : VOUCHER_OBJ.credentialSubject.offers[0].benefit.discount;

      VOUCHER_OBJ.credentialSubject.id = subjectId ? subjectId : VOUCHER_OBJ.credentialSubject.id;
      VOUCHER_OBJ.id = voucherId ? voucherId : VOUCHER_OBJ.id;
      VOUCHER_OBJ.issuanceDate = issuanceDate ? issuanceDate : VOUCHER_OBJ.issuanceDate;
      VOUCHER_OBJ.expirationDate = expirationDate ? expirationDate : VOUCHER_OBJ.expirationDate;
      VOUCHER_OBJ.credentialSubject.associatedAddress.blockchainTezos = blockchainTezos ? blockchainTezos : VOUCHER_OBJ.credentialSubject.id;

      await Voucher.updateOne({ _id: req.params.id }, { voucher: VOUCHER_OBJ });

      return res.status(200).json({ message: "Voucher updated", success: true, data: [] });
    } else if (voucherType === MEMBERSHIP_KEY) {

      MEMBERSHIP_CARD_OBJ.credentialSubject.offers.duration = duration ? duration : MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].duration;
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].cardPrice.currency = currency ? currency : MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].cardPrice.currency;
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].cardPrice.value = value ? value : MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].cardPrice.value;
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].benefit.discount = discount ? discount : MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].benefit.discount;

      MEMBERSHIP_CARD_OBJ.credentialSubject.id = subjectId ? subjectId : MEMBERSHIP_CARD_OBJ.credentialSubject.id;
      MEMBERSHIP_CARD_OBJ.id = voucherId ? voucherId : MEMBERSHIP_CARD_OBJ.id;
      MEMBERSHIP_CARD_OBJ.issuanceDate = issuanceDate ? issuanceDate : MEMBERSHIP_CARD_OBJ.issuanceDate;
      MEMBERSHIP_CARD_OBJ.expirationDate = expirationDate ? expirationDate : MEMBERSHIP_CARD_OBJ.expirationDate;
      MEMBERSHIP_CARD_OBJ.credentialSubject.associatedAddress.blockchainTezos = blockchainTezos ? blockchainTezos : MEMBERSHIP_CARD_OBJ.credentialSubject.id;

      await Voucher.updateOne({ _id: req.params.id }, { voucher: MEMBERSHIP_CARD_OBJ });

      return res.status(200).json({ message: "Membership card updated", success: true, data: [] });
    }

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};


exports.deleteVoucher = async (req, res) => {
  try {
    try {
      await Voucher.findById(req.params.id);
    } catch (err) {
      res.status(400).json({ message: "No voucher found", success: true, data: [] });
    }

    await Voucher.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Voucher deleted", success: true, data: [] });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};
