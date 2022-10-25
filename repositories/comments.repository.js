const {Comments} = require('../models')

class CommentRepository{

    /**댓글 전체조회
     * @param {Number} meetingId 댓글 조회할 게시글
     * @returns 조회한 댓글들 리턴
     */
    getComment = async(meetingId)=>{
        const comments = await Comments.findAll({
            where:{meetingId}
        })
        return comments;        
    };

    /**댓글 생성
     * @param {Number} meetingId 생성할 댓글의 게시글ID
     * @param {Number} userId 댓글을 생성할 유저ID
     * @param {String} comment 댓글 내용
     */
    createComment = async(meetingId,userId,comment)=>{
        const comments = await Comments.create(
            {meetingId,userId,comment}
        )
        return comments
    }

    /**댓글 수정
     * @param {Number} commentId 수정할 댓글ID
     * @param {Number} userId 댓글 수정하는 유저ID
     * @param {String} comment 수정할 댓글내용
     */
    updateComment = async(commentId,userId,comment)=>{
        const comments = await Comments.update(
        {comment},
        {where:{commentId,userId}}
        )
        
        return comments
    }
    
    /**댓글 삭제
     * @param {Number} commentId 삭제할 댓글ID
     * @param {Number} userId 삭제 요청한 유저ID
     */
    deleteComment = async(commentId,userId)=>{
        const comments =await Comments.destroy(
            {where:{commentId,userId}}
            )
            return comments
    }

    findCommentById = async (commentId) => {
        const isExistComment = await Comment.findByPk(commentId);
        return isExistComment;
      };
}

module.exports = CommentRepository