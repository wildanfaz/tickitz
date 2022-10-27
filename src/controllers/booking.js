const ctrl = {}
const model = require('../models/booking')
const response = require('../helpers/response')

ctrl.GetBooking = async (req, res) => {
    try {
        const data = await model.GetBook()
        for (let i = 0; i < data.length; i++) {
            const totalPayment = 5 * data[i].number_of_ticket
            data[i].total_payment = `$${totalPayment},00`
        }
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.AddBooking = async (req, res) => {
    try {
        const data = await model.AddBook(req.body)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.UpdateBooking = async (req, res) => {
    try { 
        const id = req.params.id
        const data = await model.UpdateBook(id, req.body)
        return response(res, 200, data)
    }
    catch(err) {
        return response(res, 500, err, true)
    }
}

ctrl.DeleteBooking = async (req, res) => {
    try {
        const id = req.params.id
        const data = await model.DeleteBook(id)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

module.exports = ctrl