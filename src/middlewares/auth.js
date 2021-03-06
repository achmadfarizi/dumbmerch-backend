const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) =>{
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).send({
            message:'access denied'
        })
    }
    try {
        const secret_key = process.env.TOKEN_KEY
        const verified = jwt.verify(token, secret_key)

        req.user = verified

        next()

    } catch (error) {
        res.status(400).send({
            message:'invalid token'
        })
    }
}