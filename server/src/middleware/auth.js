const jwt = require('jsonwebtoken')
const User = require('../models/general')

const auth = async (req, res, next) => {
    try {
        console.log("AUTHHHH")
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log(decoded._id)
        console.log(token)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log(user)
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
   
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })

    }
}

module.exports = auth