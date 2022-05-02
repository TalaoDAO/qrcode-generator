const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === 'null') {
        return res
            .status(401)
            .json({
                message: 'Authorization failed.',
                success: false,
            }) //401 -> not authorised
    }

    try {
        const decode = jwt.verify(token, config.get('ACCESS_TOKEN_SECRET'))
        req.user = decode
        next()
    } catch (err) {
        res.status(403).json({message: 'Authorization failed.', success: false})
    }
}
