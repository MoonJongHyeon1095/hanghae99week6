const {Comments} = require('../models')

class CommentRepository{
constructor(){
    this.Comments = Comments
}
    //전체 댓글 조회
    getComment = async(meetingId)=>{
        const comments = await this.Comments.findAll({
            where:{meetingId}
        })
        return comments;        
    };

    createComment = async(meetingId,userId,comment)=>{
        const comments = await this.Comments.create(
            {meetingId,userId,comment}
        )
        return comments
    }

    updateComment = async(commentId,userId,comment)=>{
        const comments = await this.Comments.update(
        {comment},
        {where:{commentId,userId}}
        )
        
        return comments
    }
    
    deleteComment = async(commentId,userId)=>{
        const comments =await this.Comments.destroy(
            {where:{commentId,userId}}
            )
            return comments
    }
}

module.exports = CommentRepository