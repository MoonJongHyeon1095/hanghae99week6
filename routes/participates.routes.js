const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

const ParticipatesController = require('../controllers/participates.controller');
const participatesController = new ParticipatesController();

router.put('/:meetingId', authMiddleware)

module.exports = router;