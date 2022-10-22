const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

const ImagesController = require('../controllers/images.controller')
const imagesController = new ImagesController()

const upload = require('../util/multer')


router.post('/', authMiddleware, upload.single('image'), imagesController.uploadImage );

module.exports = router;