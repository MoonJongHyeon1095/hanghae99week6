const CommentsService = require('../services/comments.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class CommentsController {
    constructor() {
        this.CommentsService = new CommentsService()
    }

    /**댓글 불러오기 컨트롤러 */
    getComment = async (req,res,next)=>{
        try {
            /**불러올 댓글의 게시글ID */
            const meetingId = req.params.meetingId;

            /**게시글ID로 불러온 댓글들 */
            const comments = await this.CommentsService.getComment(
                meetingId
            )

            /**생성된 댓글 클라이언트에 보내기 */
            res.json({result : comments})

        }catch(error){
            next(error)
        }
    }

    /**댓글생성 컨트롤러 */
    createComment = async (req,res,next) =>{
        try {
            /**생성할 댓글의 게시글ID */
            const meetingId = req.params.meetingId;

            /**로그인된 유저의 정보 */
            const user = res.locals.user;

            /**클라이언트에서 보낸 수정할 댓글내용*/
            const comment = req.body.comment;

            /**댓글을 생성할 유저ID(로그인된 유저ID) */
            const userId = user.userId;

            /** 클라이언트에서 받은 댓글 유무확인 없을시 에러메세지*/
            if(!comment){
                res.status(400).send("내용이 없습니다.")
            }

            /** 댓글생성 서비스 호출 */
            await this.CommentsService.createComment(
                meetingId,userId,comment
            )

            /**정상적으로 생성되면 완료메세지 */
                res.send("댓글 작성이 완료되었습니다.")
        }catch(error){
            next(error)
        }
    }

    /**댓글 수정 컨트롤러 */
    updateComment = async (req,res,next) =>{
        try {
            /**수정할 댓글ID */
            const commentId = req.params.commentId;

            /** 로그인된 유저정보*/
            const user = res.locals.user;

            /** 수정할 댓글내용*/
            const comment = req.body.comment;

            /**수정요청을한 유저ID*/
            const userId = user.userId;

            /**댓글수정 서비스 호출*/
            await this.CommentsService.updateComment(
                commentId,userId,comment
            )
            /**정상적으로 수정되면 완료메세지 */
            res.send("수정이 완료되었습니다.")
    }catch(error){
        next(error)
    }
}

    /**댓글 삭제 컨트롤러 */
    deleteComment = async(req,res,next) =>{
        try{
            /**삭제할 댓글ID */
            const commentId = req.params.commentId;

            /**로그인된 유저정보 */
            const user = res.locals.user;

            /**삭제요청을한 유저ID*/
            const userId = user.userId;

            /**댓글삭제 서비스 호출*/
            await this.CommentsService.deleteCommnet(
                commentId,userId
            )
            /**정상적으로 삭제되면 완료메세지 */
            res.send("삭제가 완료되었습니다.")
        }catch(error){
            next(error)
        }
    }



}
module.exports = CommentsController;