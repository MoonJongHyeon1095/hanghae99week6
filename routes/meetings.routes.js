const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

const MeetingsController = require('../controllers/meetings.controller');
const meetingsController = new MeetingsController();

router.get('/', meetingsController.findAllMeeting);
router.get('/:meetingId',meetingsController.findOneMeeting);
router.post('/', authMiddleware,meetingsController.createMeeting);
router.put('/:meetingId', authMiddleware,meetingsController.updateMeeting);
router.delete('/:meetingId', authMiddleware,meetingsController.deleteMeeting);


module.exports = router;