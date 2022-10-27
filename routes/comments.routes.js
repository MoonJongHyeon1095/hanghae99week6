const {Router} = require('express');
const commentsRouter = Router()
const authMiddleware = require('../middlewares/authMiddleware')

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

commentsRouter.get('/', authMiddleware,commentsController.getComment);
commentsRouter.get('/:meetingId', authMiddleware,commentsController.getComment);
commentsRouter.post('/:meetingId', authMiddleware,commentsController.createComment);
commentsRouter.put('/:commentId', authMiddleware,commentsController.updateComment);
commentsRouter.delete('/:commentId', authMiddleware,commentsController.deleteComment);


module.exports = commentsRouter;