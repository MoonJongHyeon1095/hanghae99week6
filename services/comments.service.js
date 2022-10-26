const CommentRepository = require("../repositories/comments.repository");
const { InvalidParamsError, ValidationError } = require("../exceptions/index.exception");

class CommentService {
  constructor() {
    this.CommentRepository = new CommentRepository();
  }

  getComment = async (meetingId) => {
    const comments = await this.CommentRepository.getComment(meetingId);

    return comments.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
  };

  createComment = async (meetingId, userId, comment) => {
    const comments = await this.CommentRepository.createComment(
      meetingId,
      userId,
      comment
    );

    return comments;
  };

  updateComment = async (commentId, userId, comment) => {
    const isExistComment = await this.commentRepository.findCommentById(commentId);
    if (!isExistComment) throw new ValidationError('그런 댓글이 없어....');

    const updatedComment = await this.CommentRepository.updateComment(
      commentId,
      userId,
      comment
    );
    if (!updatedComment) throw new new ValidationError('너가 쓴 댓글이 아닐 거 같은데?');

    return updatedComment;
  };

  deleteComment = async (commentId, userId) => {
    const isExist = await this.commentRepository.findCommentById(commentId);
    if (!isExist) throw new ValidationError('그런 댓글이 없어....');
    
    const comments = await this.CommentRepository.deleteComment(
      commentId,
      userId
    );
    return comments;
  };
}

module.exports = CommentService;
