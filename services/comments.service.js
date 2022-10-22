const CommentRepository = require('../repositories/comments.repository')

class CommnetService { 
    constructor(){
        this.CommentRepository = new CommentRepository();
    }

    getComment = async(meetingId) =>{
        const commnets = await this.CommentRepository.getComment(
            meetingId
            )

        return commnets
    };

    createComment = async(meetingId,userId,comment)=>{
        const commnets = await this.CommentRepository.createComment(
            meetingId,userId,comment
            )
            
        return commnets
    }

    updateComment =async(commentId,userId,comment)=>{
        const commnets = await this.CommentRepository.updateComment(
            commentId,userId,comment
        )
        return commnets
    }

    deleteCommnet = async(commentId,userId)=>{
        const commnets = await this.CommentRepository.deleteComment(
            commentId,userId
        )
        return commnets
    }
}

module.exports = CommnetService