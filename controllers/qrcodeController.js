const uuid = require("uuid");
const crypto = require("crypto");
const didkit = require("../helpers/didkit-handler");
const config = require("config");
const moment = require("moment");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const client = require('../helpers/redis-client');

exports.getQRCode = async (req, res) => {
    try {

        const randomId = uuid.v4()
        const sessionId = generateAccessToken({id: randomId})
        const dateTime = moment();
        const did = await didkit.getDid(config.get('DEFAULT_JWK'));

        const userData = {
            id: randomId,
            session_id: sessionId,
            date_time: dateTime,
            issuer: did
        }

        await client.rPush(config.get('REDIS_KEY'), JSON.stringify(userData))

        console.log(await client.lRange(config.get('REDIS_KEY'), 0, -1))

        const url = `${config.get('API_URL')}/api/qrcode-generator/${randomId}?issuer=${did}`

        const data = {
            url,
            id: randomId,
            session_id: sessionId,
            date_time: dateTime,
            issuer: did
        }

        res.status(200).json({message: "QR Code URL", success: true, data});

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
}

exports.getChallenge = async (req, res) => {
    try {
        const users = await client.lRange(config.get('REDIS_KEY'), 0, -1)

        const userIndex = users.findIndex(user => JSON.parse(user).id === req.params.id)

        if (userIndex === -1) {
            return res.status(400).json({message: "Invalid session!", success: false});
        }

        const user = JSON.parse(users[userIndex])

        const previousTime = user.date_time
        const now = moment()

        const duration = moment.duration(now.diff(previousTime));
        const minutes = duration.minutes();

        // if (minutes > 3) {
        //     return res.status(400).json({message: "Session expired!", success: false});
        // }

        const challenge = crypto.randomBytes(8).toString('base64')
        user.challenge = challenge;
        user.date_time = moment();
        await client.lSet(config.get('REDIS_KEY'), userIndex, JSON.stringify(user))
        console.log(await client.lRange(config.get('REDIS_KEY'), 0, -1))

        const data = {
            "challenge": challenge,
            "domain": "talao.co",
            "query": [
                {
                    "credentialQuery": [
                        {
                            "example": {
                                "type": "VerifiableCredential"
                            }
                        }
                    ],
                    "type": "QueryByExample"
                }
            ],
            "type": "VerifiablePresentationRequest"
        }

        res.status(200).json(data);

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
}

exports.verify = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()[0].msg, success: false});
    }

    const {presentation} = req.body;

    try {
        const users = await client.lRange(config.get('REDIS_KEY'), 0, -1)

        const userIndex = users.findIndex(user => JSON.parse(user).id === req.params.id)

        if (userIndex === -1) {
            return res.status(400).json({message: "Invalid session!", success: false});
        }

        const user = JSON.parse(users[userIndex])

        const previousTime = user.date_time
        const now = moment()

        const duration = moment.duration(now.diff(previousTime));
        const minutes = duration.minutes();

        if (minutes > 10) {
            return res.status(400).json({message: "Session expired!", success: false});
        }

        const presentationObj = JSON.parse(presentation)

        if (presentationObj.verifiableCredential.credentialSubject.type !== 'EmailPass' ||
            presentationObj.verifiableCredential.issuer !== config.get('EMAIL_PASS_DID')) {
            return res.status(400).json({message: "Login verification failed", success: false});
        }

        user.logged_in = true;

        await client.lSet(config.get('REDIS_KEY'), userIndex, JSON.stringify(user))

        console.log(await client.lRange(config.get('REDIS_KEY'), 0, -1))

        res.status(200).json({message: "Login successful", success: true});

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
}

const generateAccessToken = (payload) => {
    return jwt.sign(payload, config.get('ACCESS_TOKEN_SECRET'), {expiresIn: '15m'})
}
