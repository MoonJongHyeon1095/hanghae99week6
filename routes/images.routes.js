const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

const ImagesController = require('../controllers/images.controller')
const imagesController = new ImagesController()

const upload = require('../util/multer')


router.post('/', authMiddleware, upload.array('image',5), imagesController.uploadImages );

module.exports = router;