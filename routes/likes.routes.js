const {Router} = require('express');
const likesRouter = Router()
const authMiddleware = require('../middlewares/authMiddleware')

const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

likesRouter.put('/:meetingId', authMiddleware,likesController.put);


module.exports = likesRouter;