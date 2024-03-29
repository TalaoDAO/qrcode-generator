const { validationResult } = require("express-validator");
const Voucher = require("../models/vouchers");
const User = require("../models/users");
const SignedVoucher = require("../models/signed_credentials");
const { VOUCHER_OBJ, VOUCHER_KEY, MEMBERSHIP_CARD_OBJ, MEMBERSHIP_KEY, VOUCHER_MOBILE_KEY, ARAGO_KEY, ARAGO_OBJ,
  LOYALTY_CARD, LOYALTY_CARD_OBJ, MEMBERSHIP_MOBILE_KEY
} = require("../utils");
const didkit= require('../helpers/didkit-handler');
const config = require('config');
const mongoose = require("mongoose");
const moment = require("moment");

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

    let typeEnd = ''

    if (req.params.type === VOUCHER_MOBILE_KEY) {
      typeEnd = VOUCHER_MOBILE_KEY
    }
    else if (req.params.type === MEMBERSHIP_MOBILE_KEY) {
      typeEnd = MEMBERSHIP_MOBILE_KEY
    }
    else if (req.params.type === LOYALTY_CARD) {
      typeEnd = LOYALTY_CARD
    }
    else if (req.params.type === ARAGO_KEY) {
      typeEnd = ARAGO_KEY
    } else {
      typeEnd = `${req.params.type}_${voucher.id}`
    }

    const url = `${config.get('ISSUER_URL')}/issuer/${typeEnd}`

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
    group
  } = req.body;

  try {

    const user = await User.create({ name: parseInt((Math.random() * 1000).toString()) });
    let blockchainAccountPrefix = 'tz1';

    if (blockchain === 'Ethereum' || blockchain === 'Polygone') {
      blockchainAccountPrefix = '0x'
    }

    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    let voucher;

    if (type === VOUCHER_KEY) {
      VOUCHER_OBJ.credentialSubject.affiliate.name = name ? name : VOUCHER_OBJ.credentialSubject.affiliate.name;
      VOUCHER_OBJ.credentialSubject.affiliate.pseudo = pseudo ? pseudo : VOUCHER_OBJ.credentialSubject.affiliate.pseudo;
      VOUCHER_OBJ.credentialSubject.affiliate.email = email ? email : VOUCHER_OBJ.credentialSubject.affiliate.email;
      VOUCHER_OBJ.credentialSubject.affiliate.phone = phone ? phone : VOUCHER_OBJ.credentialSubject.affiliate.phone;
      VOUCHER_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation = commission ? commission : VOUCHER_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation;
      VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain = blockchain ? blockchain :VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain;
      VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchainAccount = blockchainAccount ? blockchainAccount : blockchainAccountPrefix + randomString;
      VOUCHER_OBJ.credentialSubject.offers.duration = duration ? duration : VOUCHER_OBJ.credentialSubject.offers.duration;
      VOUCHER_OBJ.credentialSubject.offers.benefit.discount = discount ? discount : VOUCHER_OBJ.credentialSubject.offers.benefit.discount;

      voucher = await Voucher.create({ _id: new mongoose.Types.ObjectId(), user, voucher: VOUCHER_OBJ, type });

      return res.status(200).json({ message: "Voucher created", success: true, data: voucher });

    } else if (type === VOUCHER_MOBILE_KEY) {

        VOUCHER_OBJ.credentialSubject.offers.duration = duration ? duration : VOUCHER_OBJ.credentialSubject.offers.duration;
        VOUCHER_OBJ.credentialSubject.offers.benefit.discount = discount ? discount : VOUCHER_OBJ.credentialSubject.offers.benefit.discount;

        const existingVoucher = await Voucher.findById(VOUCHER_MOBILE_KEY)
        if (existingVoucher) {
            await Voucher.updateOne({_id: VOUCHER_MOBILE_KEY}, {voucher: VOUCHER_OBJ});
        } else {
            voucher = await Voucher.create({_id: VOUCHER_MOBILE_KEY, user, voucher: VOUCHER_OBJ, type});
        }

        return res.status(200).json({message: "Voucher mobile created", success: true, data: voucher});
    } else if (type === MEMBERSHIP_KEY) {
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers.duration = duration ? duration : MEMBERSHIP_CARD_OBJ.credentialSubject.offers.duration;
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers.cardPrice.currency = currency ? currency : MEMBERSHIP_CARD_OBJ.credentialSubject.offers.cardPrice.currency;
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers.cardPrice.value = value ? value : MEMBERSHIP_CARD_OBJ.credentialSubject.offers.cardPrice[0].value;
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers.benefit.discount = discount ? discount : MEMBERSHIP_CARD_OBJ.credentialSubject.offers.benefit.discount;

      voucher = await Voucher.create({ _id: new mongoose.Types.ObjectId(), user, voucher: MEMBERSHIP_CARD_OBJ, type });

      return res.status(200).json({ message: "Membership card created", success: true, data: voucher });

    }  else if (type === MEMBERSHIP_MOBILE_KEY) {

      MEMBERSHIP_CARD_OBJ.credentialSubject.offers.duration = duration ? duration : MEMBERSHIP_CARD_OBJ.credentialSubject.offers.duration;
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers.benefit.discount = discount ? discount : MEMBERSHIP_CARD_OBJ.credentialSubject.offers.benefit.discount;

      const existingVoucher = await Voucher.findById(MEMBERSHIP_MOBILE_KEY)
      if (existingVoucher) {
        await Voucher.updateOne({_id: MEMBERSHIP_MOBILE_KEY}, {voucher: MEMBERSHIP_CARD_OBJ});
      } else {
        voucher = await Voucher.create({_id: MEMBERSHIP_MOBILE_KEY, user, voucher: MEMBERSHIP_CARD_OBJ, type});
      }

      return res.status(200).json({message: "Membership card mobile created", success: true, data: voucher});
    } else if (type === ARAGO_KEY) {
      ARAGO_OBJ.credentialSubject.duration = duration ? duration : ARAGO_OBJ.credentialSubject.duration
      ARAGO_OBJ.credentialSubject.group = group ? group : ARAGO_OBJ.credentialSubject.group

      const existingVoucher = await Voucher.findById(ARAGO_KEY)
      if (existingVoucher) {
        await Voucher.updateOne({ _id: ARAGO_KEY }, { voucher: ARAGO_OBJ });
      } else {
        voucher = await Voucher.create({ _id: ARAGO_KEY, user, voucher: ARAGO_OBJ, type });
      }

      return res.status(200).json({ message: "Arago pass created", success: true, data: voucher });
    } else if (type === LOYALTY_CARD) {

      LOYALTY_CARD_OBJ.credentialSubject.duration = duration ? duration : LOYALTY_CARD_OBJ.credentialSubject.duration;

      const existingVoucher = await Voucher.findById(LOYALTY_CARD)
      if (existingVoucher) {
        await Voucher.updateOne({_id: LOYALTY_CARD}, {voucher: LOYALTY_CARD_OBJ});
      } else {
        voucher = await Voucher.create({_id: LOYALTY_CARD, user, voucher: LOYALTY_CARD_OBJ, type});
      }

      return res.status(200).json({message: "Loyalty card created", success: true, data: voucher});
    }

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

exports.postCredentials = async (req, res) => {
  const {signed_voucher} = req.body;
  try {
    if (!signed_voucher) {
      return res.status(400).json({ message: "Not signed voucher found!", success: false});
    }

    const signedVoucher = await SignedVoucher.create({ signed_voucher });

    res.status(200).json({ message: "Signed Voucher created", success: true, data: signedVoucher });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

exports.getVouchers = async (req, res) => {
  try {

    const EXCLUDE_TYPE = [ARAGO_KEY, VOUCHER_MOBILE_KEY, LOYALTY_CARD, MEMBERSHIP_MOBILE_KEY]
    const vouchers = await Voucher.find({type: {$nin: EXCLUDE_TYPE}});
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
    issuer,
    birthDate,
    addressCountry,
    ageRange,
    nationality,
    group
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
      VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchainAccount = blockchainAccount ? blockchainAccount : VOUCHER_OBJ.credentialSubject.affiliate.paymentAccepted.blockchainAccount
      VOUCHER_OBJ.credentialSubject.offers.duration = duration ? duration : VOUCHER_OBJ.credentialSubject.offers.duration;
      VOUCHER_OBJ.credentialSubject.offers.benefit.discount = discount ? discount : VOUCHER_OBJ.credentialSubject.offers.benefit.discount;

      VOUCHER_OBJ.credentialSubject.id = subjectId ? subjectId : VOUCHER_OBJ.credentialSubject.id;
      VOUCHER_OBJ.id = voucherId ? voucherId : VOUCHER_OBJ.id;
      VOUCHER_OBJ.issuanceDate = issuanceDate ? issuanceDate : VOUCHER_OBJ.issuanceDate;
      VOUCHER_OBJ.expirationDate = expirationDate ? expirationDate : VOUCHER_OBJ.expirationDate;
      VOUCHER_OBJ.credentialSubject.associatedAddress.blockchainTezos = blockchainTezos ? blockchainTezos : VOUCHER_OBJ.credentialSubject.associatedAddress.blockchainTezos;
      VOUCHER_OBJ.credentialSubject.offers.analytics = "https://talao.co/analytics/" + blockchainTezos

      await Voucher.updateOne({ _id: req.params.id }, { voucher: VOUCHER_OBJ });

      return res.status(200).json({ message: "Voucher updated", success: true, data: [] });
    } else if (voucherType === MEMBERSHIP_KEY || voucherType === MEMBERSHIP_MOBILE_KEY) {

      MEMBERSHIP_CARD_OBJ.credentialSubject.offers.duration = duration ? duration : MEMBERSHIP_CARD_OBJ.credentialSubject.offers.duration;
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers.cardPrice.currency = currency ? currency : MEMBERSHIP_CARD_OBJ.credentialSubject.offers.cardPrice.currency;
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers.cardPrice.value = value ? value : MEMBERSHIP_CARD_OBJ.credentialSubject.offers.cardPrice.value;
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers.benefit.discount = discount ? discount : MEMBERSHIP_CARD_OBJ.credentialSubject.offers.benefit.discount;

      MEMBERSHIP_CARD_OBJ.credentialSubject.id = subjectId ? subjectId : MEMBERSHIP_CARD_OBJ.credentialSubject.id;
      MEMBERSHIP_CARD_OBJ.id = voucherId ? voucherId : MEMBERSHIP_CARD_OBJ.id;
      MEMBERSHIP_CARD_OBJ.issuanceDate = issuanceDate ? issuanceDate : MEMBERSHIP_CARD_OBJ.issuanceDate;
      MEMBERSHIP_CARD_OBJ.expirationDate = expirationDate ? expirationDate : MEMBERSHIP_CARD_OBJ.expirationDate;
      MEMBERSHIP_CARD_OBJ.credentialSubject.associatedAddress.blockchainTezos = blockchainTezos ? blockchainTezos : MEMBERSHIP_CARD_OBJ.credentialSubject.id;
      MEMBERSHIP_CARD_OBJ.credentialSubject.offers.analytics = "https://talao.co/analytics/" + blockchainTezos
      MEMBERSHIP_CARD_OBJ.credentialSubject.addressCountry = addressCountry ? addressCountry : MEMBERSHIP_CARD_OBJ.credentialSubject.addressCountry;

      MEMBERSHIP_CARD_OBJ.credentialSubject.ageRange = ageRange ? ageRange : MEMBERSHIP_CARD_OBJ.credentialSubject.ageRange;
      MEMBERSHIP_CARD_OBJ.credentialSubject.nationality = nationality ? nationality : MEMBERSHIP_CARD_OBJ.credentialSubject.nationality;

      await Voucher.updateOne({ _id: req.params.id }, { voucher: MEMBERSHIP_CARD_OBJ });

      return res.status(200).json({ message: "Membership card updated", success: true, data: [] });

    } else if (voucherType === ARAGO_KEY) {
      ARAGO_OBJ.credentialSubject.duration = duration ? duration : ARAGO_OBJ.credentialSubject.duration;
      ARAGO_OBJ.credentialSubject.group = group ? group : ARAGO_OBJ.credentialSubject.group;

      ARAGO_OBJ.credentialSubject.id = subjectId ? subjectId : ARAGO_OBJ.credentialSubject.id;
      ARAGO_OBJ.id = voucherId ? voucherId : ARAGO_OBJ.id;
      ARAGO_OBJ.issuer = issuer ? issuer : ARAGO_OBJ.issuer;
      ARAGO_OBJ.issuanceDate = issuanceDate ? issuanceDate : ARAGO_OBJ.issuanceDate;
      ARAGO_OBJ.expirationDate = expirationDate ? expirationDate : ARAGO_OBJ.expirationDate;

      await Voucher.updateOne({ _id: ARAGO_KEY }, { voucher: ARAGO_OBJ });

      return res.status(200).json({ message: "Arago pass updated", success: true, voucher: [] });
    } else if (voucherType === LOYALTY_CARD) {
      LOYALTY_CARD_OBJ.credentialSubject.duration = duration ? duration : LOYALTY_CARD_OBJ.credentialSubject.duration;

      let newAgeRange

      if (birthDate) {
        const years = moment().diff(birthDate, 'years');
        if (years < 18) {
          newAgeRange = "-18"
        } else if (years < 24){
          newAgeRange = "18-24"
        } else if (years < 34){
          newAgeRange = "25-34"
        } else if (years < 44){
          newAgeRange = "35-44"
        } else if (years < 54){
          newAgeRange = "45-54"
        } else if (years < 64){
          newAgeRange = "55-64"
        } else {
          newAgeRange = "65+"
        }
      }

      LOYALTY_CARD_OBJ.credentialSubject.ageRange = newAgeRange ? newAgeRange : LOYALTY_CARD_OBJ.credentialSubject.ageRange;

      LOYALTY_CARD_OBJ.credentialSubject.id = subjectId ? subjectId : LOYALTY_CARD_OBJ.credentialSubject.id;
      LOYALTY_CARD_OBJ.credentialSubject.addressCountry = addressCountry ? addressCountry : LOYALTY_CARD_OBJ.credentialSubject.addressCountry;
      LOYALTY_CARD_OBJ.id = voucherId ? voucherId : LOYALTY_CARD_OBJ.id;
      LOYALTY_CARD_OBJ.issuer = issuer ? issuer : LOYALTY_CARD_OBJ.issuer;
      LOYALTY_CARD_OBJ.issuanceDate = issuanceDate ? issuanceDate : LOYALTY_CARD_OBJ.issuanceDate;
      LOYALTY_CARD_OBJ.expirationDate = expirationDate ? expirationDate : LOYALTY_CARD_OBJ.expirationDate;

      await Voucher.updateOne({ _id: LOYALTY_CARD }, { voucher: LOYALTY_CARD_OBJ });

      return res.status(200).json({ message: "Loyalty card updated", success: true, voucher: [] });
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
