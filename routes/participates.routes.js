const {Router} = require('express');
const participatesRouter = Router()
const authMiddleware = require('../middlewares/authMiddleware')

const ParticipatesController = require('../controllers/participates.controller');
const participatesController = new ParticipatesController();

participatesRouter.put('/:meetingId', authMiddleware,participatesController.put)

module.exports = participatesRouter;