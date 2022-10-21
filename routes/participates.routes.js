const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddlewars')

const ParticipatesController = require('../controllers/participates.controller');
const participatesController = new ParticipatesController();

router.put('/:meetingId', authMiddleware, participatesController)

module.exports = router;