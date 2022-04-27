const redis = require("redis");
const uuid = require("uuid");
const crypto = require("crypto");
const didkit = require("../helpers/didkit-handler");
const config = require("config");
const moment = require("moment");
const client = redis.createClient();

client.connect().then()

exports.getQRCode = async (req, res) => {
    try {

        const randomId = uuid.v4()
        const sessionId = crypto.randomBytes(64).toString('base64')
        const dateTime = moment();

        await client.set('id', randomId)
        await client.set('session_id', sessionId)
        await client.set('date_time', dateTime)

        const did = await didkit.getDid(config.get('DEFAULT_JWK'));

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
        const id = await client.get('id')
        if (id !== req.params.id) {
            return res.status(400).json({message: "Invalid session!", success: false});
        }

        const previousTime = await client.get('date_time')
        const now = moment()

        const duration = moment.duration(now.diff(previousTime));
        const minutes = duration.minutes();

        if (minutes > 3) {
            return res.status(400).json({message: "Session expired!", success: false});
        }

        const challenge = crypto.randomBytes(64).toString('base64')

        await client.set('challenge', challenge)
        await client.set('date_time', moment())

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
