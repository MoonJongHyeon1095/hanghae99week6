const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.get('/', authMiddleware);
router.get('/:meetingId', authMiddleware);
router.post('/:mettingId', authMiddleware);
router.put('/:commentId', authMiddleware);
router.delete('/:commentId', authMiddleware);


module.exports = router;