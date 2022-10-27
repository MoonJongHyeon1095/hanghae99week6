const {Router} = require('express');
const imagesRouter = Router()
const ImagesController = require('../controllers/images.controller')
const imagesController = new ImagesController()
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../util/multer')

imagesRouter.post('/:meetingId', authMiddleware, upload.array('image',5), imagesController.uploadImages );
imagesRouter.delete('/:meetingId', authMiddleware, imagesController.deleteImage );

module.exports = imagesRouter;