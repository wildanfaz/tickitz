const express = require('express')
const Router = express.Router()
const authCheck = require('../middleware/authCheck')
const ctrl = require('../controllers/booking')

Router.get('/', authCheck(['user', 'admin']), ctrl.GetBooking)
Router.post('/', authCheck(['user', 'admin']), ctrl.AddBooking)
Router.put('/:id', authCheck(['user', 'admin']), ctrl.UpdateBooking)
Router.delete('/:id', authCheck(['user', 'admin']), ctrl.DeleteBooking)

module.exports = Router