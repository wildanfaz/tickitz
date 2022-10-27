const ctrl = {}
const model = require('../models/schedule')
const modelMov = require('../models/movie')
const response = require('../helpers/response')

ctrl.GetSchedule = async (req, res) => {
    try {
        const data = await model.GetSch()
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.AddSchedule = async (req, res) => {
    try {
        const data = await model.AddSch(req.body)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.UpdateSchedule = async (req, res) => {
    try {
        const id = req.params.id
        const data = await model.UpdateSch(id, req.body)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.DeleteSchedule = async (req, res) => {
    try {
        const id = req.params.id
        const data = await model.DeleteSch(id)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.GetCinema = async (req, res) => {
    try {
        const data = await model.GetCin()
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.AddCinema = async (req, res) => {
    try {
        const data = await model.AddCin(req.body)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.UpdateCinema = async (req, res) => {
    try {
        const id = req.params.id
        const data = await model.UpdateCin(id, req.body)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.DeleteCinema = async (req, res) => {
    try {
        const id = req.params.id
        const data = await model.DeleteCin(id)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.GetMovSchDetail = async (req, res) => {
    try {
        const {movie_title} = req.query
        const toLower = movie_title.toLowerCase()
        const data = await modelMov.SearchMov2(toLower)
        const cinema = await model.GetCin()
        data.push({date : 'Select Date', location : 'Select Location'})
        data.push(cinema)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

module.exports = ctrl