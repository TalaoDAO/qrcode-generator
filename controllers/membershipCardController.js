const { validationResult } = require("express-validator");
const MebershipCard = require("../models/membershipCards");
const User = require("../models/users");
const { MEMBERSHIPCARD_OBJ } = require("../utils");
const didkit= require('../helpers/didkit-handler');
const config = require('config');

exports.getMembershipCard = async (req, res) => {
    
    try {

        const mebershipCard = await MebershipCard.findById(req.params.id);
    
        res.status(200).json({ message: "Mebership Card data", success: true, mebershipCard });
    
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: "No Mebership Card found", success: true, data: [] });
    }
    
};

exports.generateQRCode = async (req, res) => {
    try {
        const mebershipCard = await MebershipCard.findById(req.params.id);
    
        const url = `${config.get('ISSUER_URL')}/issuer/${mebershipCard.id}`
    
        res.status(200).json({ message: "QR Code URL", success: true, data: url });
    
        } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: "No Mebership Card found", success: true, data: [] });
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
    
        MEMBERSHIPCARD_OBJ.credentialSubject.offers[0].duration = duration ? duration : MEMBERSHIPCARD_OBJ.credentialSubject.offers[0].duration;
        MEMBERSHIPCARD_OBJ.credentialSubject.offers[0].cardPrice.currency = currency ? currency : MEMBERSHIPCARD_OBJ.credentialSubject.offers[0].cardPrice.currency;
        MEMBERSHIPCARD_OBJ.credentialSubject.offers[0].cardPrice.value = value ? value : MEMBERSHIPCARD_OBJ.credentialSubject.offers.cardPrice[0].value

        const mebershipCard = await MebershipCard.create({ user, mebershipCards: MEMBERSHIPCARD_OBJ });

        res.status(200).json({ message: "Membership cards created", success: true, data: mebershipCard });

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
    } = req.body;

    try {

        try {
        await MebershipCard.findById(req.params.id);
        } catch (err) {
        res.status(400).json({ message: "No Membership Card found", success: true, data: [] });
        }

        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        MEMBERSHIPCARD_OBJ.credentialSubject.offers.duration = duration ? duration : MEMBERSHIPCARD_OBJ.credentialSubject.offers.duration;
        MEMBERSHIPCARD_OBJ.credentialSubject.offers[0].cardPrice.currency = currency ? duration : MEMBERSHIPCARD_OBJ.credentialSubject.offers[0].cardPrice.currency;
        MEMBERSHIPCARD_OBJ.credentialSubject.offers[0].cardPrice.value = value ? value : MEMBERSHIPCARD_OBJ.credentialSubject.offers.cardPrice[0].value


        await MebershipCard.updateOne({ _id: req.params.id }, { mebershipCard: MEMBERSHIPCARD_OBJ });

        res.status(200).json({ message: "Mebership Card updated", success: true, data: [] });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
};
