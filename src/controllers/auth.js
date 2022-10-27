const ctrl = {}
const model = require('../models/users')
const jwt = require('jsonwebtoken')
const bcr = require('bcrypt')
const response = require('../helpers/response')

const genToken = async (username) => {
    try {
        const payload = {}  
        if (username === 'wildan') {
            payload.user = username,
            payload.role = 'admin'
        } else {
            payload.user = username,
            payload.role = 'user'
        }
        const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn : '30m'} )
        const result = {
            msg: `token created`,
            username: username,
            role: payload.role,
            token: token
        }
        return result

    } catch (error) {
        throw error
    }
}

ctrl.Login = async (req, res) => {
    try {
        const { username, password } = req.body
        const passDb = await model.GetByUser(username)
        if (passDb <= 0) {
            return response(res, 401, 'invalid username', true)
        }

        const check = await bcr.compare(password, passDb[0].password)
        if (!check) {
            return response(res, 401, 'invalid password', true)
        }

        const result = await genToken(username)
        return response(res, 200, result)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

module.exports = ctrl