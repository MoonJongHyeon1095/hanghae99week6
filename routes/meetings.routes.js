const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddlewars')

const MeetingsController = require('../controllers/meetings.controller');
const meetingsController = new MeetingsController();

router.get('/', authMiddleware, meetingsController);
router.get('/:meetingId',authMiddleware, meetingsController);
router.post('/', authMiddleware, meetingsController);
router.put('/:meetingId', authMiddleware, meetingsController);
router.delete('/:meetingId', authMiddleware, meetingsController);

module.exports = router;