const multer = require('multer')

const storages = multer.diskStorage({
    destination: 'images',
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})

const filter = (req, file, cb) => {
    if (
        file.mimetype == 'image/jpg' || 
        file.mimetype == 'image/jpeg' || 
        file.mimetype == 'image/png' 
    ) {
        cb(null, true)
    } else {
        cb(new Error('Invalid File'), false)
    }
}

module.exports = multer({
        storage: storages,
        fileFilter: filter
    })