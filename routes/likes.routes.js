const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddlewars')

const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

router.put('/:meetingId', authMiddleware, likesController);


module.exports = router;