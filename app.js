require('dotenv').config()
const express = require('express')
const server = express()
const main = require('./src/main')
const db = require('./src/config/db')

async function init() {
    try {
        await db.connect()
        server.use(express.urlencoded({ extended: true }))
        server.use(express.json())
        server.use('/images', express.static('image'))
        server.use('/api/v1', main)
        
        server.listen(process.env.APP_PORT, () => {
            console.log("server is running")
        })
    } catch (err) {
        console.log(err);
    }
}
init()