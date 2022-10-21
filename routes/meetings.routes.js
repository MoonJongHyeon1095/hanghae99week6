const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

const MeetingsController = require('../controllers/meetings.controller');
const meetingsController = new MeetingsController();

router.get('/', authMiddleware);
router.get('/:meetingId',authMiddleware);
router.post('/', authMiddleware);
router.put('/:meetingId', authMiddleware);
router.delete('/:meetingId', authMiddleware);

module.exports = router;