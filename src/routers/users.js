const express = require('express')
const Router = express.Router()
const authCheck = require('../middleware/authCheck')
const ctrl = require('../controllers/users')

Router.get('/', authCheck(['user', 'admin']), ctrl.GetUsers)
Router.get('/search', authCheck(['user', 'admin']), ctrl.GetUserByNameQuery)
Router.get('/@:name', authCheck(['user', 'admin']), ctrl.GetUserByNameParams)
Router.post('/', ctrl.AddUser)
Router.put('/@:name', authCheck(['admin']), ctrl.UpdateUser)
Router.delete('/@:name', authCheck(['admin']), ctrl.DeleteUser)

module.exports = Router