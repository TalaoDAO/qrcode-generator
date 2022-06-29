const { validationResult } = require("express-validator");
const MembershipCard = require("../models/membershipCards");
const User = require("../models/users");
const { MEMBERSHIP_CARD_OBJ } = require("../utils");
const didkit= require('../helpers/didkit-handler');
const config = require('config');

exports.getMembershipCard = async (req, res) => {
    
    try {

        const membershipCard = await MembershipCard.findById(req.params.id);
    
        res.status(200).json({ message: "Membership Card data", success: true, membershipCard });
    
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: "No Membership Card found", success: true, data: [] });
    }
    
};

exports.generateQRCode = async (req, res) => {
    try {
        const membershipCard = await MembershipCard.findById(req.params.id);
    
        const url = `${config.get('ISSUER_URL')}/issuer/${membershipCard.id}`
    
        res.status(200).json({ message: "QR Code URL", success: true, data: url });
    
        } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: "No Membership Card found", success: true, data: [] });
        }
    };

exports.postMembershipCard = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg, success: false });
    }

    const {
        value,
        currency,
        duration,
    } = req.body;
 
    try {
        const user = await User.create({ name: parseInt((Math.random() * 1000).toString()) });

        MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].duration = duration ? duration : MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].duration;
        MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].cardPrice.currency = currency ? currency : MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].cardPrice.currency;
        MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].cardPrice.value = value ? value : MEMBERSHIP_CARD_OBJ.credentialSubject.offers.cardPrice[0].value

        const membershipCard = await MembershipCard.create({ user, membershipCards: MEMBERSHIP_CARD_OBJ });

        res.status(200).json({ message: "Membership cards created", success: true, data: membershipCard });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
};


exports.updateMembershipCard = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg, success: false });
    }

    const {
        value,
        currency,
        duration,
        blockchainTezos,
        expirationDate,
        issuanceDate,
        voucherId,
        subjectId,
    } = req.body;

    try {

        try {
        await MembershipCard.findById(req.params.id);
        } catch (err) {
        res.status(400).json({ message: "No Membership Card found", success: true, data: [] });
        }

        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        MEMBERSHIP_CARD_OBJ.credentialSubject.offers.duration = duration ? duration : MEMBERSHIP_CARD_OBJ.credentialSubject.offers.duration;
        MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].cardPrice.currency = currency ? duration : MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].cardPrice.currency;
        MEMBERSHIP_CARD_OBJ.credentialSubject.offers[0].cardPrice.value = value ? value : MEMBERSHIP_CARD_OBJ.credentialSubject.offers.cardPrice[0].value

        MEMBERSHIP_CARD_OBJ.credentialSubject.id = subjectId ? subjectId : MEMBERSHIP_CARD_OBJ.credentialSubject.id;
        MEMBERSHIP_CARD_OBJ.id = voucherId ? voucherId : MEMBERSHIP_CARD_OBJ.id;
        MEMBERSHIP_CARD_OBJ.issuanceDate = issuanceDate ? issuanceDate : MEMBERSHIP_CARD_OBJ.issuanceDate;
        MEMBERSHIP_CARD_OBJ.expirationDate = expirationDate ? expirationDate : MEMBERSHIP_CARD_OBJ.expirationDate;
        MEMBERSHIP_CARD_OBJ.credentialSubject.associatedAddress.blockchainTezos = blockchainTezos ? blockchainTezos : MEMBERSHIP_CARD_OBJ.credentialSubject.id;

        await MembershipCard.updateOne({ _id: req.params.id }, { membershipCard: MEMBERSHIP_CARD_OBJ });

        res.status(200).json({ message: "Membership Card updated", success: true, data: [] });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
};
