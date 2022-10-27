const express = require('express')
const Router = express.Router()
const authCheck = require('../middleware/authCheck')
const ctrl = require('../controllers/schedule')

Router.get('/', authCheck(['user', 'admin']), ctrl.GetSchedule)
Router.get('/movie', authCheck(['user', 'admin']), ctrl.GetMovSchDetail)
Router.post('/', authCheck(['user', 'admin']), ctrl.AddSchedule)
Router.put('/update/:id', authCheck(['user', 'admin']), ctrl.UpdateSchedule)
Router.delete('/:id', authCheck(['user', 'admin']), ctrl.DeleteSchedule)

Router.get('/cinema', authCheck(['user', 'admin']), ctrl.GetCinema)
Router.post('/cinema', authCheck(['admin']), ctrl.AddCinema)
Router.put('/cinema/update/:id', authCheck(['admin']), ctrl.UpdateCinema)
Router.delete('/cinema/:id', authCheck(['admin']), ctrl.DeleteCinema)

module.exports = Router