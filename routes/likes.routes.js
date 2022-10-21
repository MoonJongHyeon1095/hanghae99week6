const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

router.put('/:meetingId', authMiddleware);


module.exports = router;