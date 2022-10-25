const CommentRepository = require('../repositories/comments.repository')

class CommentService { 
    constructor(){
        this.CommentRepository = new CommentRepository();
    }

    getComment = async(meetingId) =>{
        const comments = await this.CommentRepository.getComment(
            meetingId
            )

        return comments
    };

    createComment = async(meetingId,userId,comment)=>{
        const comments = await this.CommentRepository.createComment(
            meetingId,userId,comment
            )
            
        return comments
    }

    updateComment =async(commentId,userId,comment)=>{
        const comments = await this.CommentRepository.updateComment(
            commentId,userId,comment
        )
        return comments
    }

    deleteComment = async(commentId,userId)=>{
        const comments = await this.CommentRepository.deleteComment(
            commentId,userId
        )
        return comments
    }
}

module.exports = CommentService