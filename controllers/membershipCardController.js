const { validationResult } = require("express-validator");
const Voucher = require("../models/vouchers");
const User = require("../models/users");
const { MEMBERSHIPCARD_OBJ } = require("../utils");
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
    } = req.body;

    try {

        const user = await User.create({ name: parseInt((Math.random() * 1000).toString()) });
        const blockchainAccountPrefix = 'tz1';
        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.name = name ? name : MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.name;
        MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.pseudo = pseudo ? pseudo : MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.pseudo;
        MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.email = email ? email : MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.email;
        MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.phone = phone ? phone : MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.phone;
        MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation = commission ? commission : MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation;
        MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain = blockchain ? blockchain :MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain;
        MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.paymentAccepted.blockchainAccount = blockchainAccount ? blockchainAccount + randomString : blockchainAccountPrefix + randomString;
        MEMBERSHIPCARD_OBJ.credentialSubject.offers.duration = duration ? duration : MEMBERSHIPCARD_OBJ.credentialSubject.offers.duration;

        const voucher = await Voucher.create({ user, voucher: MEMBERSHIPCARD_OBJ });

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

        MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.name = name ? name : MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.name;
        MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.pseudo = pseudo ? pseudo : MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.pseudo;
        MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.email = email ? email : MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.email;
        MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.phone = phone ? phone : MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.phone;
        MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation = commission ? commission : MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.benefit.incentiveCompensation;
        MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain = blockchain ? blockchain :MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.paymentAccepted.blockchain;
        MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.paymentAccepted.blockchainAccount = blockchainAccount ? blockchainAccount + randomString : MEMBERSHIPCARD_OBJ.credentialSubject.affiliate.paymentAccepted.blockchainAccount
        MEMBERSHIPCARD_OBJ.credentialSubject.offers.duration = duration ? duration : MEMBERSHIPCARD_OBJ.credentialSubject.offers.duration;

        MEMBERSHIPCARD_OBJ.credentialSubject.id = subjectId ? subjectId : MEMBERSHIPCARD_OBJ.credentialSubject.id;
        MEMBERSHIPCARD_OBJ.id = voucherId ? voucherId : MEMBERSHIPCARD_OBJ.id;
        MEMBERSHIPCARD_OBJ.issuanceDate = issuanceDate ? issuanceDate : MEMBERSHIPCARD_OBJ.issuanceDate;
        MEMBERSHIPCARD_OBJ.expirationDate = expirationDate ? expirationDate : MEMBERSHIPCARD_OBJ.expirationDate;
        MEMBERSHIPCARD_OBJ.credentialSubject.associatedAddress.blockchainTezos = blockchainTezos ? blockchainTezos : MEMBERSHIPCARD_OBJ.credentialSubject.id;

        await Voucher.updateOne({ _id: req.params.id }, { voucher: MEMBERSHIPCARD_OBJ });

        res.status(200).json({ message: "Voucher updated", success: true, data: [] });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
};
