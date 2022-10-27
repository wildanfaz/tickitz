const jwt = require('jsonwebtoken')
const response = require('../helpers/response')

const authValidateRole = (role) => {
    return (req, res, next) => {
        const { authtoken } = req.headers
        if (!authtoken) {
            return response(res, 401, 'login required', true)
        }

        jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode) => {            
            if (err) {
                return response(res, 401, err, true)
            } else if (role.includes(decode.role)) {
                next()
            } else {
                return response(res, 401, 'user does not have access', true)
            }
        })
    }  
}

module.exports = authValidateRole