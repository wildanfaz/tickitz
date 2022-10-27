const ctrl = {}
const model = require('../models/movie')
const response = require('../helpers/response')
const fs = require('fs')
const cloudinary = require('../config/cloudinary')

ctrl.GetMoviesList = async (req, res) => {
    try {
        const data = await model.GetMovList()
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.GetMoviesDetail = async (req, res) => {
    try {
        const data = await model.GetAllMov()
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.AddMovie = async (req, res) => {
    try {
        const images = 'http://localhost:8080/' + req.file.path
        const data = await model.AddMov(req.body, images)
        console.log(req.file)
        return response(res, 200, data)
    }
    catch(err) {
        return response(res, 500, err, true)
    }
}

ctrl.UpdateMovie = async (req, res) => {
    try { 
        const id = req.params.id
        const data = await model.UpdateMov(id, req.body)
        return response(res, 200, data)
    }
    catch(err) {
        return response(res, 500, err, true)
    }
}

ctrl.DeleteMovie = async (req, res) => {
    try {
        const id = req.params.id
        const data = await model.DeleteMov(id)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.SearchMovie = async (req, res) => {
    try {
        const {movie_title} = req.query
        const toLower = movie_title.toLowerCase()
        const data = await model.SearchMov(toLower)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

ctrl.DeleteImage = async (req, res) => {
    try {
        const dir = 'images/'
        const name = req.params.name
        fs.unlinkSync(dir + name)
        return response(res, 200, 'image has been deleted')
      } catch (err) {
        return response(res, 500, err, true)
      }
}

ctrl.UpdateImage = async (req, res) => {
    try {
        const dir = 'images/'
        const name = req.params.name
        fs.unlinkSync(dir + name)
        return response(res, 200, 'image has been updated')
      } catch (err) {
        return response(res, 500, err, true)
      }
}

ctrl.AddCloudinaryImg = async (req, res) => {
    try {
        console.log(req.file)
        cloudinary.uploader.upload(req.file.path, {
            folder : 'images', 
            public_id : req.file.filename 
        }, function(error, result) {console.log(result)})
        setTimeout(() => {fs.unlinkSync(req.file.path)},60000)
        return response(res, 200, 'image has been uploaded')
      } catch (err) {
        return response(res, 500, err, true)
      }
}

ctrl.DeleteCloudinaryImg = async (req, res) => {
    try {
        cloudinary.uploader.destroy('images/' + req.params.name, 
        function(error, result) {console.log(result)})
        return response(res, 200, 'image has been deleted')
      } catch (err) {
        return response(res, 500, err, true)
      }
}

ctrl.UpdateCloudinaryImg = async (req, res) => {
    try {
        cloudinary.uploader.destroy('images/' + req.params.name, 
        function(error, result) {console.log(result)})

        cloudinary.uploader.upload(req.file.path, {
            folder : 'images', 
            public_id : req.file.filename 
        }, function(error, result) {console.log(result)})
        setTimeout(() => {fs.unlinkSync(req.file.path)},60000)
        return response(res, 200, 'image has been updated')
      } catch (err) {
        return response(res, 500, err, true)
      }
}

ctrl.Pagination = async (req, res) => {
    try {
        const pagination = {
            page: req.query.page || 1,
            limit: req.query.limit || 3
        }
        const data = await model.Pagination(pagination)
        return response(res, 200, data)
    } catch (err) {
        return response(res, 500, err, true)
    }
}

module.exports = ctrl