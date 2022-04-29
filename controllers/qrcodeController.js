const redis = require("redis");
const uuid = require("uuid");
const crypto = require("crypto");
const didkit = require("../helpers/didkit-handler");
const config = require("config");
const moment = require("moment");
const {validationResult} = require("express-validator");
const client = redis.createClient();

client.connect().then()

const REDIS_KEY = 'redisKey'

exports.getQRCode = async (req, res) => {
    try {

        const randomId = uuid.v4()
        const sessionId = crypto.randomBytes(64).toString('base64')
        const dateTime = moment();

        const did = await didkit.getDid(config.get('DEFAULT_JWK'));

        const userData = {
            id: randomId,
            session_id: sessionId,
            date_time: dateTime,
            issuer: did
        }

        await client.rPush(REDIS_KEY, JSON.stringify(userData))

        console.log(await client.lRange(REDIS_KEY, 0, -1))

        const url = `https://tezotopia.talao.co/${randomId}?issuer=${did}`

        const data = {
            url,
            id: randomId,
            session_id: sessionId,
            date_time: dateTime
        }

        res.status(200).json({message: "QR Code URL", success: true, data});

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
}

exports.getChallenge = async (req, res) => {
    try {
        const users = await client.lRange(REDIS_KEY, 0, -1)

        const userIndex = users.findIndex(user => JSON.parse(user).id === req.params.id)

        if (userIndex === -1) {
            return res.status(400).json({message: "Invalid session!", success: false});
        }

        const user = JSON.parse(users[userIndex])

        const previousTime = user.date_time
        const now = moment()

        const duration = moment.duration(now.diff(previousTime));
        const minutes = duration.minutes();

        if (minutes > 3) {
            return res.status(400).json({message: "Session expired!", success: false});
        }

        const challenge = crypto.randomBytes(64).toString('base64')

        user.challenge = challenge;
        user.date_time = moment();

        await client.lSet(REDIS_KEY, userIndex, JSON.stringify(user))

        console.log(await client.lRange(REDIS_KEY, 0, -1))

        const data = {
            "type": "VerifiablePresentationRequest",
            "query": [
                {
                    "type": "QueryByExample",
                    "credentialQuery": [
                        {
                            "example": {
                                "type": "EmailPass"
                            }
                        }
                    ]
                }
            ],
            "challenge": challenge,
            "domain": "talao.co"
        }


        res.status(200).json({message: "Challenge data", success: true, data});

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
        const users = await client.lRange(REDIS_KEY, 0, -1)

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

        if (presentationObj.proof.challenge !== user.challenge || presentationObj.proof.domain !== 'https://talao.co/' ||
            presentationObj.verifiableCredential.credentialSubject.type !== 'EmailPass' ||
            presentationObj.verifiableCredential.issuer !== user.issuer || presentationObj.verifiableCredential.credentialSubject.email !== 'thierry.thevenet@talao.io'
        ) {
            return res.status(400).json({message: "Login verification failed", success: false});
        }

        user.logged_in = true;

        await client.lSet(REDIS_KEY, userIndex, JSON.stringify(user))

        console.log(await client.lRange(REDIS_KEY, 0, -1))

        res.status(200).json({message: "Login successful", success: true});

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
}
