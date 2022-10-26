const CommentsService = require("../services/comments.service");
const { InvalidParamsError } = require("../exceptions/index.exception");

class CommentsController {
  constructor() {
    this.CommentsService = new CommentsService();
  }

  getComment = async (req, res, next) => {
    try {
      const { meetingId } = req.params;
      const comments = await this.CommentsService.getComment(meetingId);
      res.json({ result: comments });
    } catch (error) {
      res.status(error.status||400)
      res.json({errorMessage:error.message})
    }}

  createComment = async (req, res, next) => {
    try {
      const { meetingId } = req.params;
      const { user } = res.locals;
      const { comment } = req.body;
      const userId = user.userId;
      if (!comment) {
        throw new InvalidParamsError('게시글이 존재하지 않는데요.');
      }

      const comments = await this.CommentsService.createComment(
        meetingId,
        userId,
        comment
      );
      res.send("댓글 작성이 완료되었습니다.");
    } catch (error) {
        res.status(error.status||400)
        res.json({errorMessage:error.message})
    }
  };

  updateComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { user } = res.locals;
      const { comment } = req.body;
      const userId = user.userId;

      if (!comment) {
        throw new InvalidParamsError('게시글이 존재하지 않는데요.');
      }

      const comments = await this.CommentsService.updateComment(
        commentId,
        userId,
        comment
      );
      res.send("수정이 완료되었습니다.");
    } catch (error) {
        res.status(error.status||400)
        res.json({errorMessage:error.message})
    }
  };

  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { user } = res.locals;
    const userId = user.userId;
    try {
      const comments = await this.CommentsService.deleteComment(
        commentId,
        userId
      );
      res.status(200).json({
        data: comments,
        message: '댓글 삭제했어요.',
        });
    } catch (error) {
        res.status(error.status||400)
        res.json({errorMessage:error.message})
    }
  };
}

module.exports = CommentsController;
