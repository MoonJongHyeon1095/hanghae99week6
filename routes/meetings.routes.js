const {Router} = require('express');
const meetingsRouter = Router()
const authMiddleware = require('../middlewares/authMiddleware')
const MeetingsController = require('../controllers/meetings.controller');
const meetingsController = new MeetingsController();




meetingsRouter.get('/', authMiddleware, meetingsController.findAllMeeting);
meetingsRouter.post('/', authMiddleware,meetingsController.createMeeting);
meetingsRouter.get('/:meetingId', authMiddleware, meetingsController.findOneMeeting);
meetingsRouter.put('/:meetingId', authMiddleware,meetingsController.updateMeeting);
meetingsRouter.delete('/:meetingId', authMiddleware,meetingsController.deleteMeeting);

module.exports = meetingsRouter;