const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const MeetingsController = require('../controllers/meetings.controller');
const meetingsController = new MeetingsController();
const ImagesController = require('../controllers/images.controller')
const imagesController = new ImagesController()

const upload = require('../util/multer')



router.delete('/:meetingId/images', authMiddleware, imagesController.deleteImage );
router.get('/', authMiddleware, meetingsController.findAllMeeting);
<<<<<<< HEAD
router.get('/:meetingId',authMiddleware, meetingsController.findOneMeeting);
router.post('/', authMiddleware, meetingsController.createMeeting);
=======
router.get('/:meetingId', authMiddleware, meetingsController.findOneMeeting);
router.post('/', authMiddleware,meetingsController.createMeeting);
>>>>>>> main
router.put('/:meetingId', authMiddleware,meetingsController.updateMeeting);
router.delete('/:meetingId', authMiddleware,meetingsController.deleteMeeting);
router.post('/:meetingId/images', authMiddleware, upload.array('image',5), imagesController.uploadImages );


module.exports = router;