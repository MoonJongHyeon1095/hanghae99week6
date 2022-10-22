const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.get('/', authMiddleware,commentsController.getComment);
router.get('/:meetingId', authMiddleware,commentsController.getComment);
router.post('/:mettingId', authMiddleware,commentsController.createComment);
router.put('/:commentId', authMiddleware,commentsController.updateComment);
router.delete('/:commentId', authMiddleware,commentsController.deleteComment);


module.exports = router;