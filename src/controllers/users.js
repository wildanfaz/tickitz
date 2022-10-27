const ctrl = {}
const model = require('../models/users')
const hashing = require('../helpers/hash')
const response = require('../helpers/response')

ctrl.GetUsers = async (req, res) => {
    try {
        const data = await model.GetAllData()
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.GetUserByNameQuery = async (req, res) => {
    try {
        const { name } = req.query
        const lowerName = name.toLowerCase()
        const data = await model.GetByNameQuery(lowerName)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.GetUserByNameParams = async (req, res) => {
    try {
        const name = req.params.name
        const lowerName = name.toLowerCase()
        const data = await model.GetByNameParams(lowerName)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.AddUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const dataUser = await model.GetAllData()
        for (let i = 0; i < dataUser.length; i++) {
            if (dataUser[i].username.includes(username)) {
                return response(res, 401, 'username already exists', true)
            }
        }
        const hashPassword = await hashing(password)
        const data = await model.AddUser({ username, hashPassword })
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.UpdateUser = async (req, res) => {
    try {
        const name = req.params.name
        const dataUser = await model.GetAllData()
        const { username, password } = req.body
        const arr = []
        for (let i = 0; i < dataUser.length; i++) {
            if (dataUser[i].username.includes(name)) {
                arr.push(dataUser[i].username)
            }
        }
        if (arr.length == 0) {
            return response(res, 401, 'username is not exists', true)
        }

        for (let i = 0; i < dataUser.length; i++) {
            if (dataUser[i].username.includes(username)) {
                return response(res, 401, 'new username already exists', true)
            }
        }
        
        const hashPassword = await hashing(password)
        const data = await model.UpdateUser({ username, hashPassword }, name)
        console.log(data)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.DeleteUser = async (req, res) => {
    try {
        const name = req.params.name
        const data = await model.DeleteUser(name)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

module.exports = ctrl