const express = require('express')
const Router = express.Router()
const authCheck = require('../middleware/authCheck')
const ctrl = require('../controllers/movie')
const upload = require('../middleware/upload')

Router.get('/detail', authCheck(['admin']), ctrl.GetMoviesDetail)
Router.get('/', authCheck(['user', 'admin']), ctrl.GetMoviesList)
Router.get('/list', authCheck(['user', 'admin']), ctrl.Pagination)
Router.get('/search', authCheck(['user', 'admin']), ctrl.SearchMovie)

Router.post('/', authCheck(['admin']), upload.single('image'), ctrl.AddMovie)
Router.post('/cloud', authCheck(['admin']), upload.single('image'), ctrl.AddCloudinaryImg)

Router.put('/:id', authCheck(['admin']), ctrl.UpdateMovie)
Router.put('/images/:name', authCheck(['admin']), upload.single('image'), ctrl.UpdateImage)
Router.put('/cloud/:name', authCheck(['admin']), upload.single('image'), ctrl.UpdateCloudinaryImg)

Router.delete('/:id', authCheck(['admin']), ctrl.DeleteMovie)
Router.delete('/images/:name', authCheck(['admin']), ctrl.DeleteImage)
Router.delete('/cloud/:name', authCheck(['admin']), ctrl.DeleteCloudinaryImg)

module.exports = Router