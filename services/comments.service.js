const CommentRepository = require('../repositories/comments.repository')

class CommnetService { 
    constructor(){
        this.CommentRepository = new CommentRepository();
    }

/**
 * 댓글 불러오기
 * @param {Number} meetingId 불러올 댓글의 게시글ID
 * @returns 불러온 댓글들
 */
    getComment = async(meetingId) =>{
        const commnets = await this.CommentRepository.getComment(
            meetingId
            )

        return commnets
    };

    /**
     * 댓글 생성
     * @param {Number}meetingId 작성할 댓글의 게시글ID
     * @param {Number}userId 댓글을 생성할 유저ID
     * @param {String}comment 생성할 댓글 내용
     */
    createComment = async(meetingId,userId,comment)=>{
        const commnets = await this.CommentRepository.createComment(
            meetingId,userId,comment
            )
            
        return commnets
    }

    /**
     * 댓글 수정
     * @param {Number} commentId 수정할 댓글ID
     * @param {Number} userId  수정 요청한 유저ID
     * @param {String} comment 수정할 댓글 내용
     */
    updateComment =async(commentId,userId,comment)=>{
        const commnets = await this.CommentRepository.updateComment(
            commentId,userId,comment
        )
        return commnets
    }

    /**
     * 댓글 삭제
     * @param {Number} commentId 삭제할 댓글ID
     * @param {Number} userId 삭제 요청한 유저ID
     */
    deleteCommnet = async(commentId,userId)=>{
        const commnets = await this.CommentRepository.deleteComment(
            commentId,userId
        )
        return commnets
    }
}

module.exports = CommnetService