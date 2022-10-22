const CommentsService = require('../services/comments.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class CommentsController {
    constructor() {
        this.CommentsService = new CommentsService()
    }

    getComment = async (req,res,next)=>{
        try {
            const {meetingId} = req.params
            const comments = await this.CommentsService.getComment(
                meetingId
            )
            res.json({result : comments})
        }catch(error){
            next(error)
        }
    }
    
    createComment = async (req,res,next) =>{
        try {
            const {meetingId} = req.params;
            const {user} = res.locals;
            const {comment} = req.body
            const userId = user.userId
            if(!comment){
                res.status(400).send("내용이 없습니다.")
            }

            const comments = await this.CommentsService.createComment(
                meetingId,userId,comment
            )
                res.send("댓글 작성이 완료되었습니다.")
        }catch(error){
            next(error)
        }
    }

    updateComment = async (req,res,next) =>{
        try {
            const {commentId} = req.params;
            const {user} = res.locals;
            const {comment} = req.body
            const userId = user.userId

            const comments = await this.CommentsService.updateComment(
                commentId,userId,comment
            )
            res.send("수정이 완료되었습니다.")
    }catch(error){
        next(error)
    }
}

    deleteComment = async(req,res,next) =>{
        const {commentId} = req.params;
        const {user} = res.locals;
        const userId = user.userId
        try{
        const comments = await this.CommentsService.deleteCommnet(
            commentId,userId
        )
        res.send("삭제가 완료되었습니다.")
        }catch(error){
            next(error)
        }
    }



}
module.exports = CommentsController;