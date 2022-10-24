const {Comments} = require('../models')

class CommentRepository{

    //전체 댓글 조회
    getComment = async(meetingId)=>{
        const comments = await Comments.findAll({
            where:{meetingId}
        })
        return comments;        
    };

    createComment = async(meetingId,userId,comment)=>{
        const comments = await Comments.create(
            {meetingId,userId,comment}
        )
        return comments
    }

    updateComment = async(commentId,userId,comment)=>{
        const comments = await Comments.update(
        {comment},
        {where:{commentId,userId}}
        )
        
        return comments
    }
    
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