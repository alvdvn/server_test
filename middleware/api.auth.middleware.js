const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
require('dotenv').config(); // su dung thu vien doc file env
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;


const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, chuoi_ky_tu_bi_mat)
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth

