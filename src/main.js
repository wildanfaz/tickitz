const express = require('express')
const Routers = express.Router()
const movie = require('./routers/movie')
const schedule = require('./routers/schedule')
const booking = require('./routers/booking')
const users = require('./routers/users')
const auth = require('./routers/auth')

Routers.use('/movies', movie)
Routers.use('/schedules', schedule)
Routers.use('/bookings', booking)
Routers.use('/users', users)
Routers.use('/auth', auth)

module.exports = Routers