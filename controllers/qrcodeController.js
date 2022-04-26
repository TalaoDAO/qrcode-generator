const redis = require("redis");
const uuid = require("uuid");
const crypto = require("crypto");
const didkit = require("../helpers/didkit-handler");
const config = require("config");
const client = redis.createClient();

exports.getQRCode = async (req, res) => {
    try {

        await client.connect()

        const randomId = uuid.v4()

        await client.set('id', randomId)
        await client.set('session_id', crypto.randomBytes(64).toString('base64'))
        await client.set('date_time', new Date())

        const did = await didkit.getDid(config.get('DEFAULT_JWK'));

        const url = `https://tezotopia.talao.co/${randomId}?issuer=${did}`

        res.status(200).json({ message: "QR Code URL", success: true, data: url });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
}
