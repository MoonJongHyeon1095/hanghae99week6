const CommentRepository = require("../repositories/comments.repository");
const {
  InvalidParamsError,
  ValidationError,
} = require("../exceptions/index.exception");

class CommentService {
  constructor() {
    this.CommentRepository = new CommentRepository();
  }

  /**
   * 댓글 불러오기
   * @param {Number} meetingId 불러올 댓글의 게시글ID
   * @returns 불러온 댓글들
   */

  getComment = async (meetingId) => {
    const comments = await this.CommentRepository.getComment(meetingId);

    return comments.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
  };

  /**
   * 댓글 생성
   * @param {Number}meetingId 작성할 댓글의 게시글ID
   * @param {Number}userId 댓글을 생성할 유저ID
   * @param {String}comment 생성할 댓글 내용
   */
  createComment = async (meetingId, userId, comment) => {
    const comments = await this.CommentRepository.createComment(
      meetingId,
      userId,
      comment
    );

    return comments;
  };

  /**
   * 댓글 수정
   * @param {Number} commentId 수정할 댓글ID
   * @param {Number} userId  수정 요청한 유저ID
   * @param {String} comment 수정할 댓글 내용
   */

  updateComment = async (commentId, userId, comment) => {
    const isExistComment = await this.commentRepository.findCommentById(
      commentId
    );
    if (!isExistComment) throw new ValidationError("그런 댓글이 없어....");

    const updatedComment = await this.CommentRepository.updateComment(
      commentId,
      userId,
      comment
    );
    if (!updatedComment)
      throw new new ValidationError("너가 쓴 댓글이 아닐 거 같은데?")();

    return updatedComment;
  };

  /**
   * 댓글 삭제
   * @param {Number} commentId 삭제할 댓글ID
   * @param {Number} userId 삭제 요청한 유저ID
   */
  deleteComment = async (commentId, userId) => {
    const isExist = await this.commentRepository.findCommentById(commentId);
    if (!isExist) throw new ValidationError("그런 댓글이 없어....");

    const comments = await this.CommentRepository.deleteComment(
      commentId,
      userId
    );
    return comments;
  };
}

module.exports = CommentService;
