const model = {}
const db = require('../config/db')

model.GetSch = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.schedule`)
        .then((data) => {
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.AddSch = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.schedule 
        ("date", "location", cinema_name, address, "time", price) 
        VALUES($1, $2, $3, $4, $5, $6)`, [
            data.date, 
            data.location, 
            data.cinema_name, 
            data.address, 
            data.time, 
            data.price
        ])
        .then(() => {
            resolve('data has been added')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.UpdateSch = (id, data) => {
    const query = `UPDATE public.schedule 
    SET 
        date = COALESCE(NULLIF($1, current_time), date),
        location = COALESCE(NULLIF($2, ''), location),
        cinema_name = COALESCE(NULLIF($3, ''), cinema_name),
        address = COALESCE(NULLIF($4, ''), address),
        time = COALESCE(NULLIF($5, ''), time),
        price = COALESCE(NULLIF($6, ''), price)
        WHERE id_schedules = $7
    RETURNING *`

    return new Promise((resolve, reject) => {
        db.query(query, [
            data.date, 
            data.location, 
            data.cinema_name, 
            data.address, 
            data.time, 
            data.price, 
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

model.DeleteSch = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.schedule WHERE id_schedules = $1`, [id])
        .then(() => {
            resolve('data has been deleted')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.GetCin = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.cinema ORDER BY id_cinemas ASC`)
        .then((data) => {
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.AddCin = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.cinema 
        (cinema_name, address, "time", price) 
        VALUES($1, $2, $3, $4)`, [
            data.cinema_name, 
            data.address, 
            data.time, 
            data.price
        ])
        .then(() => {
            resolve('data has been added')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.UpdateCin = (id, data) => {
    const query = `UPDATE public.cinema 
    SET 
        cinema_name = COALESCE(NULLIF($1, ''), cinema_name),
        address = COALESCE(NULLIF($2, ''), address),
        time = COALESCE(NULLIF($3, ''), time),
        price = COALESCE(NULLIF($4, ''), price)
        WHERE id_cinemas = $5
    RETURNING *`

    return new Promise((resolve, reject) => {
        db.query(query, [
            data.cinema_name, 
            data.address, 
            data.time, 
            data.price, 
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

model.DeleteCin = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.cinema 
        WHERE id_cinemas = $1`, [id])
        .then(() => {
            resolve('data has been deleted')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = model