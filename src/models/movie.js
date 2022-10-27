const model = {}
const db = require('../config/db')
const format = require('pg-format')

model.GetMovList = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id_movies, movie_title, genre FROM public.movies ORDER BY movie_title ASC`)
        .then((data) => {
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.GetAllMov = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.movies ORDER BY movie_title ASC, release_date DESC`)
        .then((data) => {
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.AddMov = (data, images) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.movies 
        (movie_title, genre, director, casts, duration, synopsis, release_date, images) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, [
            data.movie_title, 
            data.genre, 
            data.director, 
            data.casts, 
            data.duration, 
            data.synopsis, 
            data.release_date,
            images
        ])
        .then(() => {
            resolve('data has been added')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.UpdateMov = (id, data) => {
    const query = `UPDATE public.movies 
    SET 
        movie_title = COALESCE(NULLIF($1, ''), movie_title),
        genre = COALESCE(NULLIF($2, ''), genre),
        director = COALESCE(NULLIF($3, ''), director),
        casts = COALESCE(NULLIF($4, ''), casts),
        duration = COALESCE(NULLIF($5, ''), duration),
        synopsis = COALESCE(NULLIF($6, ''), synopsis),
        release_date = COALESCE(NULLIF($7, ''), images),
        images = COALESCE(NULLIF($8, ''), images)
        WHERE id_movies = $9
    RETURNING *`

    return new Promise((resolve, reject) => {
        db.query(query, [
            data.movie_title, 
            data.genre, 
            data.director, 
            data.casts, 
            data.duration, 
            data.synopsis, 
            data.release_date, 
            data.images,
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

model.DeleteMov = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.movies WHERE id_movies = $1`, [id])
        .then(() => {
            resolve('data has been deleted')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.SearchMov = (toLower) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.movies 
        WHERE LOWER(movie_title) LIKE '%' || $1 || '%' 
        ORDER BY movie_title ASC, release_date DESC`, [toLower])
        .then((data) => {
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.SearchMov2 = (toLower) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.movies WHERE LOWER(movie_title) = $1`, [toLower])
        .then((data) => {
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.Pagination = (pagination) => {
    const offset = (pagination.page - 1) * pagination.limit
    query = format(
        `SELECT * FROM public.movies 
        ORDER BY movie_title ASC, release_date DESC 
        LIMIT %s OFFSET %s`, 
        pagination.limit, 
        offset
        )

    return new Promise((resolve, reject) => {
        db.query(query)
        .then((data) => {
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = model