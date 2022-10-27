const model = {}
const db = require('../config/db')

model.GetAllData = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.users ORDER BY created_at DESC`)
        .then((data) => {
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.GetByUser = (username) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.users WHERE username = $1`, [username])
        .then((data) => {
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.GetByNameQuery = (username) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.users 
        WHERE LOWER(username) LIKE '%' || $1 || '%' 
        ORDER BY username ASC`, [username])
        .then((data) => {
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.GetByNameParams = (username) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.users 
        WHERE LOWER(username) = $1`, [username])
        .then((data) => {
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.AddUser = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.users (username, "password") VALUES($1, $2)`, [
            data.username, 
            data.hashPassword
        ])
        .then(() => {
            resolve('account has been created')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.UpdateUser = (data, name) => {
    const query = `UPDATE public.users 
    SET 
        username = COALESCE(NULLIF($1, ''), username),
        password = COALESCE(NULLIF($2, '' || NULL), password),
        updated_at = current_date
        WHERE username = $3
    RETURNING *`

    return new Promise((resolve, reject) => {
        db.query(query, [
            data.username,
            data.hashPassword,
            name
        ])
        .then(() => {
            resolve('data has been updated')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

model.DeleteUser = (name) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.users WHERE username = $1`, [name])
        .then(() => {
            resolve('data has been deleted')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = model