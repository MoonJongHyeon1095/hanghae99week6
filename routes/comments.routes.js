const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddlewars')

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.get('/', authMiddleware, commentsController);
router.get('/:meetingId', authMiddleware, commentsController);
router.post('/:mettingId', authMiddleware, commentsController);
router.put('/:commentId', authMiddleware, commentsController);
router.delete('/:commentId', authMiddleware, commentsController);


module.exports = router;