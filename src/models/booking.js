const model = {}
const db = require('../config/db')

model.GetBook = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.booking`)
        .then((data) => {
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.AddBook = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.booking (movie_selected, "date", "time", seat_choosed, cinema_name, number_of_ticket, fullname, email, phone_number, payment_method) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [
            data.movie_selected, 
            data.date, 
            data.time, 
            data.seat_choosed, 
            data.cinema_name, 
            data.number_of_ticket, 
            data.fullname, 
            data.email, 
            data.phone_number, 
            data.payment_method
            ])
        .then(() => {
            resolve('data has been added')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.UpdateBook = (id, data) => {
    const query = `UPDATE public.booking 
    SET 
        movie_selected = COALESCE(NULLIF($1, ''), movie_selected),
        date = COALESCE(NULLIF($2, current_date), date),
        time = COALESCE(NULLIF($3, ''), time),
        seat_choosed = COALESCE(NULLIF($4, ''), seat_choosed),
        cinema_name = COALESCE(NULLIF($5, ''), cinema_name),
        number_of_ticket = COALESCE(NULLIF($6, 0), number_of_ticket),
        fullname = COALESCE(NULLIF($7, ''), fullname),
        email = COALESCE(NULLIF($8, ''), email),
        phone_number = COALESCE(NULLIF($9, ''), phone_number),
        payment_method = COALESCE(NULLIF($10, ''), payment_method)
        WHERE id_bookings = $11
    RETURNING *`

    return new Promise((resolve, reject) => {
        db.query(query, [
            data.movie_selected, 
            data.date, 
            data.time, 
            data.seat_choosed, 
            data.cinema_name, 
            data.number_of_ticket, 
            data.fullname, 
            data.email, 
            data.phone_number, 
            data.payment_method, 
            id
        ])
        .then(() => {
            resolve('data has been updated')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.DeleteBook = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.booking WHERE id_bookings = $1`, [id])
        .then(() => {
            resolve('data has been deleted')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = model