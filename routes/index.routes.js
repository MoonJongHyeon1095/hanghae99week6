const express = require('express');
const indexRouter = express.Router();
const meetingsRouter = require("./meetings.routes")
const commentsRouter = require("./comments.routes")
const likesRouter = require("./likes.routes")
const participatesRouter = require("./participates.routes")
const imagesRouter = require("./images.routes")
const googleRouter = require("./google.routes")
const kakaoRouter = require("./kakao.routes")
const usersRouter = require("./users.routes")

indexRouter.use('/images',imagesRouter)
indexRouter.use('/likes', likesRouter)
indexRouter.use('/', usersRouter )
indexRouter.use('/meetings', meetingsRouter)
indexRouter.use('/comments', commentsRouter)
indexRouter.use('/participates', participatesRouter)
indexRouter.use('/google', googleRouter)
indexRouter.use('/kakao', kakaoRouter)

module.exports = indexRouter